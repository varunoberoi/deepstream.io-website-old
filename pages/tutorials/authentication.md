Authentication and Permissioning
======================================
Deepstream's security and permission model is very powerful, yet really simple. In fact,
here's all there is to it:

	server.set( 'permissionHandler', {
		isValidUser: function( handshakeData, authData, callback ) {
			callback( null, authData.username || 'open' );
		},

		canPerformAction: function( username, message, callback ) {
			callback( null, true );
		}
	});

Granted, this needs a bit of explanation: Permissions are managed by a 'permissionHandler', a
class that can be registered with the server using the `set()` method. A permissionHandler exposes 
two methods: `isValidUser` and `canPerformAction`.

`isValidUser` is called whenever a client calls `login()`. Let's go through it step by step:

First, the client is created:

	var ds = deepstream( 'localhost:6020' );

this establishes a connection to the server straight away, however the connection is kept in a quarantine
state until `ds.login()` is called. `ds.login()` takes up to two arguments, an object with authentication data and
a callback function. E.g.

	ds.login({
		user: 'LisaA',
		password: 'sesame'
	}, function( success, errorCode, errorMessage ){
		//...
	});

This will call the server's `isValidUser` method with three arguments:

* `handshakeData` is a map of connection information
* `authData` is the object that the client send with `ds.login( authData )`
* `callback` is a function that expects the result of the login. It should be called with either `callback( null, username )` for successful logins or `callback( 'rejection reason' )` for unsucessful ones.


	isValidUser: function( handshakeData, authData, callback ) {
		/* 
		 * handshakeData
		 * {
		 *     "remoteAddress": "::1",
		 *     "headers": {
		 *         "host": "localhost:6020",
		 *         "connection": "keep-alive",
		 *         "user-agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36",
		 *         "origin": "http://localhost",
		 *         "accept": "",
		 *         "referer": "http://localhost/dev/ds-demos/booksearch/frontend/shell/",
		 *         "accept-encoding": "gzip, deflate, sdch",
		 *         "accept-language": "de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4",
		 *         "cookie": "_ga=GA1.1.697722771.1430908927"
		 *     },
		 *     "referer": "http://localhost/dev/ds-demos/booksearch/frontend/shell/"
		 * }
		 * 
		 * authData
		 * {
		 * 	user: 'LisaA',
		 * 	password: 'sesame'
		 * }
		 */

		if( authData.user === 'LisaA' && password === 'sesame' ) {
			callback( null, authData.user );
		} else {
			callback( 'invalid credentials' );
		}
	}