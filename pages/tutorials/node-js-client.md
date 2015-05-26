Using the deepstream client in NodeJs
==============================================
<img class="center" src="../assets/images/nodejs.png" alt="Node Js logo" />

Deepstream's client works exactly the same in browsers and in NodeJS. (It is in fact written and tested in NodeJs and compiled for browsers using [browserify](http://browserify.org/)). The only difference: Browsers connect using the exquisite [engine.io](https://github.com/Automattic/engine.io) ***whereas NodeJS connects directly via TCP***.

### Connect via TCP
The deepstream server listens for incoming connections on two ports, one for http and websocket communication using engine.io, one for tcp connections from NodeJS clients. These can be configured using deepstream's `set()` method.

	var DeepstreamServer = require( 'deepstream.io' ),
		server = new DeepstreamServer();

	// Set host and port for browser / engine.io communication
	server.set( 'host', '0.0.0.0' ); //default 0.0.0.0
	server.set( 'port', 6020 ); //default 6020

	// Set host and port for TCP connections
	server.set( 'tcpHost', 'localhost' ); //default 0.0.0.0
	server.set( 'tcpPort', 6021 ); //default 6021

	server.start();

So to use the deepstream client in node, just install it via npm

	npm install deepstream.io-client-js

and point it to the tcp host and port

	var deepstream = require( 'deepstream.io-client-js' ),
		ds = deepstream( 'localhost:6021' ).login();
