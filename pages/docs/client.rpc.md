Remote Procedure Calls (RPCs)
-----------------------------
RPCs are deepstream's mechanism for request/response communication (think Ajax Request, but with load balancing). Deepstream clients can register as providers for RPCs using `provide`, e.g.

	client.rpc.provide( 'add-two-numbers', function( data, response ){
		response.send( data.numberA + data.numberB );
	});

Now a client can make a request that will be routed to the provider using `make`, e.g.

	var data = {
		numberA: 3,
		numberB: 8
	};

	client.rpc.make( 'add-two-numbers', data, function( error, result ){
		// error = null, result = 11
	});

If multiple providers register for the same RPC, deepstream will distribute the requests between them. It's also possible for providers to reject requests (e.g. because they're under heavy load) which will prompt deepstream to re-route the request to another available provider

rpc.provide( name, callback )
-----------------------------
argument: name
type: String
optional: false
desc: The name of the RPC. Each client can only register as a provider for an RPC name once.

argument: callback
type: Function
optional: false
desc: A function that handles incoming RPCs. Will be called with data and an <a href="rpc_response.html">RPC response object</a>.

Registers `callback` as a handler for incoming RPCs.

Please note:  
* Only one callback per client can be registered for a RPC at a time
* Deepstream tries to deliver data in its original format. Data passed to client.rpc.make as a String will arrive as a String,
numbers or implicitly JSON serialized objects will arrive in their respective format as well

rpc.unprovide( name )
----------------------------
argument: name
type: String
optional: false
desc: The name of the RPC.

De-registeres a client that was previously registered using `provide()`

rpc.make( name, data, callback )
---------------------------
argument: name
type: String
optional: false
desc: The name of the RPC.

argument: data
type: Mixed
optional: false
desc: Any serialisable data. Values will arrive in the same format they've been send (Strings, Numbers, Objects etc.)

argument: callback
type: Function
optional: false
desc: The callback function that receives the result. Will be called with two arguments: error or null and the response data

Initiates a remote procedure call.

	client.rpc.make( 'search-products', 'coffeemug', function( error, result ){
		
	});

