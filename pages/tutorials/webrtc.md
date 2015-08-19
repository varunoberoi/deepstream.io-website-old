{
	"title": "Video-Chat with deepstream and webrtc",
	"description": "An introduction and live example into deepstream's WebRTC functionality"
}

<link href="../assets/css/webrtc.css" type="text/css" rel="stylesheet" />
Video-Chat with Deepstream and WebRTC
==========================================
Web Real Time Communication is a great standard that makes it possible to establish video, audio and data-streams directly between two browsers. 
But, there’s a catch: WebRTC requires you to dive deeply into the mechanics of connection establishment, exchange offers, answers and ICE candidates - and you still need a server to establish the call.

We’ve baked all this directly into deepstream and boiled it down to two concepts: A realtime phonebook that clients can register with and subscribe to – and the ability to call anyone in it.

Combine this with other deepstream features such as permissioning, records or data-transforms and you can build an amazing realtime app without worrying too much about implementation details.

###Demo
WebRTC example

###How does it work?

Clients can register themselves as callees

	ds.webrtc.registerCallee( 'Peter Venkman', function( call, metaData ){
		if( metaData.callerName === 'Walter Peck' ) {
			call.decline( 'Nope, not interested.' );
		} else {
			call.accept( localStream );
		}

		call.on( 'established', function( remoteStream ){
			myVideo.src = URL.createObjectURL( remoteStream );
		});
	});

Other clients can subscribe to updates to the list of callees

	ds.webrtc.listenForCallees(function( callees ){
		// render list of callees
	});

and call each other

	var metaData = { callerName: 'Raymond Stantz' };
	var call = ds.webrtc.makeCall( 'Peter Venkman', metaData, localStream );

	call.on( 'established', function( remoteStream ){
		myVideo.src = URL.createObjectURL( remoteStream );
	});

	call.on( 'declined', function( reason ){
		console.log( 'Call declined because of ' + reason );
	});

###Try it out
Please find the documentation [here](../docs/webrtc.html) and have a look at our examples.

<div class="two-examples">
	<a href="https://github.com/hoxton-one/ds-demo-webtrc/tree/master/simple-example">
		<img width="200" height="125" alt="WebRTC simple example" src="../assets/images/webrtc-simple-example.png" />
		<label>Simple Example</label>
	</a>
	<a href="https://github.com/hoxton-one/ds-demo-webtrc/tree/master/complex-example">
		<img width="200" height="125" alt="WebRTC complex example" src="../assets/images/webrtc-complex-example.png" />
		<label>More feature-rich example</label>
	</a>
</div>

If you haven't used deepstream before, it might be worth trying the [getting started tutorial](getting-started.html).
