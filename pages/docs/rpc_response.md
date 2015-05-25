RpcResponse
-----------------------
RpcResponse objects are passed to rpc `provide` callbacks. They allow to explicitely acknowledge, complete or reject requests 

	client.rpc.provide( 'add-two-numbers', function( data, response ){
		response.send( data.numberA + data.numberB );
	});

ack()
-----------------------
Once a client receives a RPC request, it acknowledges this fact. This usually happens implicitly, but can be done explicitly using `ack()`. 
Doing so might make sense if the client needs to perform an asynchronous operation to determine if it will accept or reject the request.

Please note: calling `send()`, `reject()` or `error()` completes the request. Calling `ack()` after any of these methods will not do anything.

	client.rpc.provide( 'add-two-numbers', function( data, response ){

		// Turn of automatic acknowledgements. This needs to happen synchronously
		response.autoAck = false;

		// Acknowledge the request yourself
		response.ack();
	});

send( data )
-----------------------
argument: data
type: Mixed
optional: false
desc: Any serializable response data

Send the response to the client

reject()
-----------------------
Reject the request. Rejections are not errors, but merely a means of saying "I'm busy at the moment, try another client". Upon receiving a rejection deepstream will try to re-route the request to another provider for the same RPC. If there are no more providers left to try, deepstream will send a NO_RPC_PROVIDER error to the client.

error( errorMsg )
-----------------------
Send an error to the client. errorMsg will be received as the first argument to the `make` callback.

	//provider
	client.rpc.provide( 'add-two-numbers', function( data, response ){
		response.error( 'Something went wrong' );
	});

	//requestor
	client.rpc.make( 'add-two-numbers', {}, function( error, result ){
		// error = 'Something went wrong'
	});

</div>



