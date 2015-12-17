{
	"title": "Events and RPCs",
	"description": "a quick overview over deepstream's event and rpc features"
}
Events & RPCs
====================================
In addition to records, deepstream provides means of messaging and request-response communication: events and rpcs.
	
### Events
Events work just like a common event-emitter, but distributed across all connected clients

	//subscribe to an event
	ds.event.subscribe( 'someEvent', function( data ){ /****/ });

	//emit an event
	ds.event.emit( 'someEvent', 'someData' );

	//unsubscribe from an event
	ds.event.unsubscribe( 'someEvent' );

### RPCs
Remote Procedure Calls allow for Request-Reponse communication. If multiple clients are able to provide the same
rpc, deepstream will distribute requests evenly between them.

	//register as a provider for a rpc
	ds.rpc.provide( 'addTwoNumbers', function( data, response ){
		
		//you can now either send a response
		response.send( data.numA + data.numB );

		//reject the response so that it gets
		//re-routed to another provider
		response.reject();

		//or send an error back
		response.error( 'Something went wrong' );
	});

	//other clients can now call this function using
	ds.rpc.make( 'addTwoNumbers', { numA: 4, numB: 7 }, function( error, response ){
		//response is 11 now
	});

	//you can also de-register your provider
	ds.rpc.unprovide( 'addTwoNumbers' );
