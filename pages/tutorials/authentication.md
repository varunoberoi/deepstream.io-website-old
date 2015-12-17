{
	"title": "Authentication tutorial",
	"description": "learn how to authenticate clients against deepstream servers"
}
Authentication
======================================
Deepstream's security and permission model is very powerful, yet really simple. In fact,
here's all there is to it:

	server.set( 'permissionHandler', {
		isValidUser: function( connectionData, authData, callback ) {
			callback( null, authData.username || 'open' );
		},

		canPerformAction: function( username, message, callback ) {
			callback( null, true );
		},
		onClientDisconnect: function( username ){} // this one is optional
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

This will call the permissionHandler's `isValidUser` method with three arguments:

* `connectionData` is an object with connection information
* `authData` is the object that the client send with `ds.login( authData )`
* `callback` is a function that expects the result of the login. It should be called with either `callback( null, username )` for successful logins or `callback( 'rejection reason' )` for unsucessful ones.


	isValidUser: function( connectionData, authData, callback ) {
		/* 
		 * connectionData
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

		if( authData.user === 'LisaA' && authData.password === 'sesame' ) {
			callback( null, authData.user );
		} else {
			callback( 'invalid credentials' );
		}
	}

### Why do I have to pass the username to the callback?
The username will be passed to `canPerformAction()` which allows you to permission individual operations. Read about it in the [permissioning tutorial](permissioning.html)

</div>