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

Allowing / denying individual actions

Once the user is logged in, every interaction (creating, reading, writing records, events, rpcs etc.) goes trough `canPerformAction( username, message, callback )` with `username` being what ever was passed to `isValidUser`'s callback. 

It's now up to `canPerformAction` to decide whether that specific action can be performed for that specific user with that specific data. Here are some examples:

	//Allow everything
	canPerformAction: function( username, message, callback ) {
		callback( null, true );
	}

	//Prevent LisaA from deleting records
	canPerformAction: function( username, message, callback ) {
		var isAllowed = (
			username === 'LisaA' && 
			message.topic === deepstream.constants.TOPIC.RECORD &&
			message.action === deepstream.constants.ACTIONS.DELETE
		);

		callback( null, isAllowed );
	}

	// Create private records by forcing the record name to contain
	// the name of the logged in user
	canPerformAction: function( username, message, callback ) {
		// Allow every non-record message
		if( message.topic !== deepstream.constants.TOPIC.RECORD ) {
			callback( null, true );
		}
		else {
			var recordName = message.data[ 0 ];
			callback( null, recordName.indexOf( username ) !== -1 );
		}
	}

	/* Prevent the value of 'price' for record 'fancyCar' to be set to less than 60000
	 * This is a bit tricky since there are two ways to set a record's data
	 *
	 * ACTIONS.PATCH is used if only a path within the record should be changed
	 * message.data for PATCH is an array with [ recordName, version, path, value ]
	 * PLEASE NOTE! values for patch operations start with an extra character that
	 * helps deepstream to identify their type later on. To ignore them, just use 
	 * message.data[3].substr(1)
	 *
	 * ACTIONS.UPDATE is used to set the entire record's data.
	 * message.data for UPDATE is an array with [ recordName, version, data ]
	 */
	canPerformAction: function( username, message, callback ) {
		// Allow every non-record message
		if( 
			message.topic === deepstream.constants.TOPIC.RECORD &&
			message.data[ 0 ] === 'fancyCar' && ( 
				message.action === deepstream.constants.ACTIONS.PATCH || 
				message.action === deepstream.constants.ACTIONS.UPDATE
			)
		) {
			if( message.action === deepstream.constants.ACTIONS.PATCH ) {
				var price = parseInt( message.data[ 3 ].substr( 1 ) );
			} else {
				var price = message.data[ 2 ].price;
			}

			if( isNaN( price ) ) {
				callback( 'price is not a number' );
			} else {
				callback( null, price >= 60000 )
			}
		} else {
			callback( null, true );
		}
	}
