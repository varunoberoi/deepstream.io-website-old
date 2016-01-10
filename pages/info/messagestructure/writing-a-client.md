
{
    "title": "Writing a client",
    "description": "An introduction into how to write a client"
}

Writing a Client - Theory
========================================

Writing a deepstream client only requires a TCP connection, basic string manipulation and for convienience a JSON parser/builder if it isn't supported natively. What this means is that it can run using any programming language and with very basic hardware requirements.

What we will be covering here are the things to keep in mind when writing a client and an overview on some design decisions.

I would recommend you to first read how deepstream [message structure works](./index.html).

# Message Specifications

You can now view all the different message structures [here](./specs.html) as a reference for all the different messages on the system. If your not sure what a message you recieved means, want to find out if it has an associated ack or want a quick introduction into the low level protocol it's the perfect place to bookmark.

# Features

Making sure your client works in the exact way the server expects it can be quite challenging when running against a real server. Because of this, we covered all the features offered using [cucumber](https://cucumber.io/), a format that is supported by most of the popular programming languages.

What this means is you can test your client continuously while developing it using prewritten integration tests. These tests are continuously run against current clients and when you get them all passing provides the guarantee you're using the procotol correctly.

Before reading on, take a quick peek at [the connectivity feature](./connectivity) to see how they look like.

<div class="hint-box fa fa-gears">
    <h3>Hint</h3>
    <ul>
        <li>
            You can hover over messages in features and spec pages to get a breakdown of what they get parsed into.
        </li>
    </ul>
</div>

Since the tests will be run in the language the client is being written in you would also need to setup a very simple TCP server.

The best place to start would be looking at the [server step definitions](https://raw.githubusercontent.com/hoxton-one/deepstream.io-client-specs/master/step-definitions-server/step-definition-server.js) and its [TCP server](https://raw.githubusercontent.com/hoxton-one/deepstream.io-client-specs/master/step-definitions-server/tcp-server.js) and applying the same logic in your language of choice.

<div class="hint-box fa fa-gears">
    <h3>Remember to catch errors</h3>
    <ul>
        <li>
            In order to guarantee no errors are being ignored you can add a [cucumber hook](https://github.com/cucumber/cucumber/wiki/Hooks) to run after each feature and ensure no unexpected errors were thrown.
        </li>
    </ul>
</div>

# Connection States

Next on is the [connection states](../../docs/connection_states.html). The connection starts off in an AWAITING_AUTHENTICATION mode, in which you are required to login in order to be able to send and recieve messages through the server. Once you do the client should be in AUTHENTICATING, and if the login is successful the connection will end up in OPEN, which means everything is working fine.

If the connection does drop, clients are expected to go into reconnecting mode to allow them to try and reestablish the connection, in which it can either go back to AWAITING_AUTHENTICATION or result in the client closing after too many failed attempts.

<img width="100%" src="../../assets/images/connection-state-diagram.png" />

# TCP Buffering

Since clients are expected to have a very high throughput it's good practice to buffer messages within the program and then send it out once at the end of a CPU cycle.

For example, let us say I have a loop that generates lots of events:

```javascript
while( i < 10000 ) {
    deepstreamClient.event.emit( 'value', Math.random() );
    i++;
}
```

If I was to send the message through directly to the TCP socket for every iteration it would create an overhead having to interact with the socket directly so often. Instead, we can concatenate the messages within the client and then send them in one go. Because of the use of the message seperation character the server can then split the package up and process them in the same order.

```javascript
connection.prototype.send = function( message ) {
    bufferedSendMessage += message;
    if( !flushTimeout ) {
        flushTimeout = setTimeout( flushMessage );
    }
}
```

The same situation happens when you recieve a message. If the traffic is slow you might only be getting one message per packet, but when traffic volumes pickup you will need to split the data recieved and process each message individually.

```javascript
connection.prototype.recieve = function( message ) {
    var lastMessageSeperator, messages;

    lastMessageSeperator = recievedMessages.lastIndexOf( MESSAGE_SEPERATOR );
    messages = recievedMessages.substring( 0, lastMessageSeperator);
    processMessages( messages );
}
```

# Acks

Unfortunately timeouts can always occur when internet connections become so slow they might as well not work. Because of this deepstream has ack messages to let the client know the server has recieved the messages sent.

Ack timeouts are the clients responsibility to keep track of. When a message that can get an associated ack is sent out, you need to set a timer which can be removed once the server replies. If not the application will be notified which depending on the situation can allow you to try the same action again, or notify the user their desired behaviour might not have gone occurred successfully.

# Unsoliciated Messages

Messages recieved that are unexpected should throw an UNSOLICITATED_MESSAGE error. If it occurs often it's usually a useful indication something might be leaking or not have unsubscribed properly.

<div class="hint-box fa fa-gears">
    <h3>Edge Case</h3>
    <ul>
        <li>
            In the case of race conditions this could occur if the server sends a message to the client the exact same time it unsubscribed from the message. This can't be avoided, but should only happy very very rarely.
        </li>
    </ul>
</div>

# Errors

The last major thing to keep in consideration are error scenarios. If you look at the [event constants](../../docs/constants.html#Event) you'll notice that there are quite a few different unhappy scenarios that may occur. Many of these are expected behaviour, such as MESSAGE_PERMISSION_ERROR or TOO_MANY_AUTH_ATTEMPTS. Others are errors returned by deepsteam incase the message protocol was not correctly used, such as INVALID_MESSAGE_DATA, MESSAGE_PARSE_ERROR or UNKNOWN_TOPIC.

It's best practice to:
* Not let the application die when an error occurs

Always recover from them as gracefully as possible. 
* Not swallow errors

Errors occur because something went wrong. Having an empty catch statement
is only a stop gap solution and you should always make sure to log the issues that occur
* Prevent users from doing things they are not permissioned to

If a user is not permissioned to do a certain action it is advisable to stop them from attempting to. Otherwise it could result in inconsistencies on the server where the data was ignored and on the client where the changes either have to be reverted once the MESSAGE_DENIED is recieved or remain out of sync otherwise.







