Getting started
====================================
Learn how to install and start a deepstream server, how to connect to it from a browser and
how to wire a record to a text input and keep them in sync.

### Server
Install the server via npm

	npm install deepstream.io

Create a js file, e.g. `start.js`

	var DeepstreamServer = require( 'deepstream.io' ),
		server = new DeepstreamServer();

	// Optionally you can specify some settings, a full list of which
	// can be found here http://deepstream.io/docs/deepstream.html
	server.set( 'host', 'localhost' );
	server.set( 'port', 6020 );

	// start the server
	server.start();

run the file with node

	node start.js

### Client
Create a simple webpage with a single text input field. Then 
install the javascript client via bower or npm

	bower install deepstream.io-client-js

Connect to the server and login without credentials.

	ds = deepstream( 'localhost:6020' ).login();

Create a text input field

	<input type="text" />

Create a deepstream record

	record = ds.record.getRecord( 'someUser' );

Wire the two together

	input = document.querySelector( 'input' );
				
	input.onkeyup = function(){
		record.set( 'firstname', input.value );
	};

	record.subscribe( 'firstname', function( value ){
		input.value = value;
	});

Open your page in two browser windows and watch both inputs stay in sync. Alltogether your page
should now look like this:

	<!DOCTYPE html>
	<html>
		<head>
			<script 
				type="text/javascript" 
				src="bower_components/deepstream.io-client-js/dist/deepstream.js">
			</script>
		</head>
		<body>
			<input type="text" />
			<script type="text/javascript">
				ds = deepstream( 'localhost:6020' ).login();
				record = ds.record.getRecord( 'someUser' );
				input = document.querySelector( 'input' );
				
				input.onkeyup = function(){
					record.set( 'firstname', input.value );
				};

				record.subscribe( 'firstname', function( value ){
					input.value = value;
				});
			</script>
		</body>
	</html>