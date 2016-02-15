{
    "title": "The benefits of listening",
    "dateISO": "20160216",
    "author": "yasserf",
    "thumbnail": "listening-dog.jpg"
}

Realtime systems have a reputation of being expensive to run. Lets take a look at why and what we can do to make it better.

Before starting, lets look at how realtime differs from classical HTTP structures. 

* REST APIs
The way we have all become accustomed to getting data is ajax calls. Whenever you want to know the current value of something, you would send out a get request to the server and get a the appropriate reply. The key factor here is that the initiator is always the client. In cases where you want to be notified of something in realtime ( without polling the server constantly ) you would establish a webhook, which means you spin up your own HTTP endpoint that is constantly listening for updates, something that isn't really a client friendly solution.

* Realtime 
Realtime works in a different way. You have a two way communication socket, where you can constantly recieve data without ever having to request the server for newer versions. What this means is that the client can initially notify the server what things it's interested in, and whenever something happens it will be pushed to the client instantly. 

Now the part where this all gets really interesting is behind the actually client connection, in the land of databases, integrations with other sources of data. Pretty much the rest of the iceberg that provides the data to make your application functional but totally hidden behind a beautifully designed minimalistic interface. Those systems often don't know or care if any clients are actually interested in what they are publishing or if their literaly just creating redundant data noone will ever notice ( other than the people from devops monitoring the resource consumption associated ).

The ideal goal is to limit the amount of data going through the system. This reduces resources and costs. You can do so by saying that at least one client has to actually request something before you start pushing data to it. In more detail, as soon as the first client requests something, publishers can get notified and start publishing data, and when the last client loses interest the publisher no longer needs to pump that data into the system.

This works amazingly well for events, where the actual responsibility is taken off the publisher to submit all events constantly. In context of hardware, like IoT sensors, that can mean huge improvements in energy usage, since the device can suspend activity until it knows it's needed. In context of software, it reduces the load on the system significantly since no redundant events would ever be fired.

Records are just as simple, but if you derive data from the connected database you have to make sure all the records the data is derived from are requested in advance.

Finally, this approach shines the most for when the data being sent out is actually driven by the name of your request. For example, requesting 'weather/germany-berlin-1w' means the publisher needs to know that it will need to send out information for a 1 week forecast.

#### How it scales

You don't want more than one publisher updating the same record or emitting the same event. But you want to scale your microservices so they can cope with
huge amounts of data coming into your system, often from the same third party service. You can use the listen functionality to easily split concerns by handling more specific requests across multiple publishers.

For example, you could create two identical providers except where one listens to requests to all countries starting with starting with the first half of the alphabet '^weather/[a-k]' and the other to the second half '^weather/[m-z]'. This can be cut into as many publishers as you see fit to easily scale your processes within the cloud.

#### How to implement

The provider listens to records and events matching the name 'weather/'

```javascript
ds.event.listen( '^weather/.*', onMatch );
```

And the onMatch callback will be notified for all the current matches in the system, new ones that come in and old ones that noone is interested in anymore.

```javascript
function onMatch( subject, provide ) {
    //Subject is the name of the event or record that is being subscribed too

    //If provide is true it means you should start publishing data, if it's false it means you should stop
}
```

If the provider can no longer provide the data, it can stop providing by calling:

```javascript
ds.event.unlisten( '^weather/.*', onMatch );
```

For more details and code, take a look at our [tutorial](../../tutorials/data-provider.html).