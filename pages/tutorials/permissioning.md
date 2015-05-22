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
