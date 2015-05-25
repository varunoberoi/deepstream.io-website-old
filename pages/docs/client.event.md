Events
-------------------------
Events provide a simple way of sending messages. Deepstream's event mechanism basically works like an EventEmitter that's distributed across clients.

	// client a
	client.event.subscribe( 'news/politics', function( news ){

	});

	// client b
	client.event.emit( 'news/politics', { headline: '...', content: '...' });

	



event.subscribe
event.unsubscribe
event.emit