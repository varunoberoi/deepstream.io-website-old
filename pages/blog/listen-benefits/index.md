{
    "title": "Telling the world what it wants to hear",
    "dateISO": "20160216",
    "author": "yasserf",
    "thumbnail": "listening.png"
}

Realtime systems have a reputation of being expensive to run. The reason usually being that for simplicities sake, data providers inform the universe of everything they possibly could, and in turn if the client ever wants to know something, the universe will provide it. Philosophically, this had a couple of documentaries made about it. Technically, this has quite a few drawbacks.

What you want to do is limit the amount of data going through the system. You can do so by saying that at least one client has to actually request something before you start pushing data to it. In more detail, as soon as the first client requests something, publishers can get notified and start publishing data accordingly, and when the last client loses interest the publisher no longer needs to pump that data into the system.

This works amazingly well for events, where the actual responsibility is taken off the publisher to submit all events constantly, which in turn reduces their resources and costs. In context of hardware, just as IoT sensors, that can mean huge improvements in energy usage. In context of software, it means your load can be split so that you will only ever need to provide a client data depending on a need to know basis.

Records are just as simple, but if the data within the record is being used as part of a database query it probably won’t work too well!

Finally, this approach shines the most for when the data being sent out is actually derived from the content of your request this approach. For example, requesting 'weather/germany-berlin-1w' means the publisher needs to know that it will need to send out information for a 1 week forecast.

#### Benefits in scaling

You don't need more than one publisher updating the same record or emitting the same event. But you want to scale your microservices so they can cope with
huge amounts of records and events coming into your system, often from the same third party service. You can use the listen functionality to easily split concerns by handling more specific requests across multiple publishers.

For example, you could create two identical providers except where one listens to requests to all countries starting with starting with the first half of the alphabet '^weather/[a-k]' and the other to the second half '^weather/[m-z]'. This can be cut into as many publishers as you see fit to easily scale your processes within the cloud.

#### How to implement

The full workflow would be as follows:

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

For more details, a tutorial and code, please look at our FX example here.