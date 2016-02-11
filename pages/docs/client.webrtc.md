{
	"title": "WebRTC Api documentation",
	"description": "Web Real Time Communication with deepstream.io"
}
client.webrtc.registerCallee( calleeName, onCallFn )
-----------------------
argument: calleeName
type: String
optional: false
desc: the name of the callee

argument: onCallFn
type: Function
optional: false
desc: a function that will be invoked for incoming calls with a [WebRTCCall](webrtc_call.html) and metaData.

Register a callable endpoint (an entry in a phonebook) that other clients can call using `makeCall`. A client can register multiple callees, however, every callee can only be registered once.

```javascript
ds.webrtc.registerCallee( 'Peter Venkman', function( call, metaData ){
	if( metaData.callerName === 'Walter Peck' ) {
		call.decline( 'Nope, not interested.' );
	} else {
		getUserMedia({ video: true, audio: true }, function( localStream ){
			call.accept( localStream );
		}, function( error ){
			throw error;
		});
	}

	call.on( 'established', function( remoteStream ){
		myVideo.src = URL.createObjectURL( remoteStream );
	});
});
```

client.webrtc.unregisterCallee( calleeName )
-----------------------
argument: calleeName
type: String
optional: false
desc: the name of the previously registered callee

Un-register a callee that was previously registered using `client.webrtc.registerCallee`

client.webrtc.makeCall( calleeName, metaData, localStream ) 
-----------------------
argument: calleeName
type: String
optional: false
desc: the name of a callee that another client registered

argument: metaData
type: Mixed
optional: true
desc: Arbitrary data that's send to the callee to help identify the caller and decide whether to accept or decline the call

argument: localStream
type: MediaStream
optional: false
desc: An instance of a [HTML5 MediaStream](//developer.mozilla.org/en/docs/Web/API/MediaStream)

Establishes a call with `calleeName` and returns an instance of [WebRTCCall](webrtc_call.html)

```javascript
getUserMedia({ video: true, audio: true }, function( localStream ){
	var metaData = { callerName: 'Raymond Stantz' };
	var call = ds.webrtc.makeCall( 'Peter Venkman', metaData, localStream );

	call.on( 'established', function( remoteStream ){
		myVideo.src = URL.createObjectURL( remoteStream );
	});

	call.on( 'declined', function( reason ){
		console.log( 'Call declined because of ' + reason );
	});
}, function( error ){
	throw error;
});
```

client.webrtc.listenForCallees( callback )
-----------------------
argument: callback
type: Function
optional: false
desc: a callback that will be invoked with a list of callees

Listen for changes to the list of registered callees. Callback will be invoked initially with the full list
of currently registered calleeNames and from thereon with an updated list of callees for every change. Only one calleeListener can be registered per client (but its easy to multiplex updates from there, e.g. by using an event emitter.)

```javascript
client.webrtc.listenForCallees(function( calleeNames ){
	/*
		 + calleeNames = [
		 +	'Peter Venkman', 
		 +	'Raymond Stantz', 
		 +	'Egon Spengler', 
		 +	'Winston Zeddmore'
		 + ]
	 */
	$scope.callees = calleeNames;
	$scope.$apply();
});
```

client.webrtc.unlistenForCallees()
-----------------------
Informs deepstream that the client is no longer interested in callee updates
</div>