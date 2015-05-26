Events
-------------------------
Events provide a simple way of sending messages betweem clients. Deepstream's event mechanism basically works like an EventEmitter that's distributed across clients.

	// client a
	client.event.subscribe( 'news/politics', function( news ){

	});

	// client b
	client.event.emit( 'news/politics', { headline: '...', content: '...' });


subscribe( event, callback );
-----------------------------
argument: event
type: String
optional: false
desc: an eventname

argument: callback
type: Function
optional: false
desc: A function that will be called whenever the event is emitted

Subscribe to an event emitted by this or any of the other clients.

unsubscribe( event, callback );
-----------------------------
argument: event
type: String
optional: false
desc: an eventname

argument: callback
type: Function
optional: true
desc: the callback that was previously registered with subscribe. If the callback is omitted, all listeners for the event will be removed

Unsubscribes from an event that was previosly registered with `subscribe()`.

event.emit( event, data );
------------------------------
argument: event
type: String
optional: false
desc: an eventname

argument: data
type: Mixed
optional: true
desc: Any serialisable data ( Objects, Strings, Numbers... ) that will be send with the event

Sends an event to zero or more subscribed clients.

</div>
