{
	"title": "Video-Chat with deepstream and webrtc",
	"description": "An introduction and live example into deepstream's WebRTC functionality"
}

<link href="../assets/css/webrtc.css" type="text/css" rel="stylesheet" />
Video-Chat with Deepstream and WebRTC
==========================================


###How is this different from other WebRTC libraries?
Deepstream's WebRTC implementation is on a very high level. It abstracts all implementation and connectivity details away and instead offers just two concepts: A phonebook and a call. Combined with other deepstream features such as permissioning, records or data-transformation this 

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
	<a href="#">
		<img width="200" height="125" alt="WebRTC simple example" src="../assets/images/webrtc-simple-example.png" />
		<label>Simple Example</label>
	</a>
	<a href="#">
		<img width="200" height="125" alt="WebRTC complex example" src="../assets/images/webrtc-complex-example.png" />
		<label>Callees and States</label>
	</a>
</div>

If you haven't used deepstream before, it might be worth having a quick look at the [getting started tutorial](getting-started.html).
