{
	"title": "Records tutorial",
	"description": "learn about records, deepstream's observable data structures"
}
Records
==============================
[Records](docs/record.html) are arbitrary JSON structures that can be manipulated and subscribed to. Every change to a record is synced accross all subscribed clients

	//creating or retrieving a record is the same
	var johnDoe = ds.record.getRecord( 'johnDoe' );

	//you can set the entire record's content
	johnDoe.set({ firstname: 'John', lastname: 'Doe' });

	//or just a path within the record
	johnDoe.set( 'age', 28 );

	//getting data from a record works the same
	johnDoe.get();

	//but be aware, if your record exists already
	//it needs a brief moment to receive its data
	johnDoe.whenReady(function(){
		alert( johnDoe.get( 'middleName' ));
	});

	//or if you just want to get the value of a
	//specific path
	johnDoe.get( 'firstname' );

	//paths can be as complex as you like. If you
	//set a value for a path that doesn't exist yet,
	//deepstream will create it
	johnDoe.set( 'hobbies[2].name', 'skiing' );

	//you can subscribe to changes of the entire record...
	johnDoe.subscribe(function( data ){ /*...*/ });

	//or just the changes of a specific field
	var happyBirthday = function( newAge ){ alert( 'Happy birthday' );};
	johnDoe.subscribe( 'age', happyBirthday );

	//You can remove subscriptions
	johnDoe.unsubscribe( 'age', happyBirthday );

	//records also emit events
	johnDoe.on( 'delete', function(){
		alert( 'someone deleted this record' );
	});

	//Once you are no longer interested in receiving
	//updates for this record, call discard
	johnDoe.discard();

	//Or delete the record entirely
	johnDoe.delete();


### Record names
Every record is identified by a unique name. This name can be any string, but we found that there are some naming conventions that help a lot with larger scale applications:

#### Use unique, randomized ids
It's tempting to use a field that could act as primary key as the recordname, e.g. `user/johndoe`, but using a UID, e.g. `user/iam7f3vy-2mgd656jrx3di` has some advantages: You don't need to ensure its uniqueness, the user can change his username later without invalidating the record and ids generated with deepstream's `ds.getUid()` method are loosely sequential (the first 8 characters are a base64 encoded) which helps databases to index them more efficiently.

#### Organize your records into collections
Prefixing your record names with a collection, e.g. `user/bob` rather than just `bob` makes them easier to organize and allows storage-connectors to create individual database tables or collections for each.

#### Use a security group to support permissioning
If your system has to support multiple users or groups that are not allowed to access each others data, it might make sense to include the id of the group into the record name. This allows the permissionHandler to deny access to records straight away if they don't belong to the user's group.

**Client**

	var ds = deepstream( '143.234.324.234:6020' );
	ds.login({ user: 'paul', pass: 'abc' }, function( success ){
		if( success ) {
			//Allowed
			var recA = ds.record.getRecord( 'beatles-albums' );
			//Forbidden
			var recB = ds.record.getRecord( 'stones-albums' );
		}
	});

**Server**

	//Permission Handler
	var users = {
		'paul':  { pass: 'abc', group: 'beatles' },
		'john':  { pass: 'def', group: 'beatles' },
		'keith': { pass: 'ghi', group: 'stones' },
		'mick':  { pass: 'jkl', group: 'stones' }
	};

	server.set( 'permissionHandler', {
		isValidUser: function( connectionData, authData, callback ) {
			if( users[ authData.user ].pass === authData.pass ) {
				callback( null, authData.user );
			} else {
				callback( 'Invalid Credentials' );
			}
		},
		canPerformAction: function( username, message, callback ) {
			var recordName = message.data[ 0 ];
			var requestedGroup = recordName.split( '-' )[ 0 ];
			var actualGroup = users[ username ].group;

			callback( null, requestedGroup === actualGroup );
		}
	});


### Lists & Anonymous Records
Deepstream has two other concepts that extend records: <a href="lists.html">Lists</a> and Anonymous Records.

<a href="lists.html">Lists</a> are arrays of record names that come with a number of helper-methods like `addEntry` or `removeEntry`. 

An Anonymous Record is a record without a predefined name. It
acts as a wrapper around an actual record that can be swapped out for another one whilst keeping all bindings intact.

### Listening for record subscriptions made by other clients
deepstream allows you to register a callback function that will be notified whenever clients subscribe to a record for the first time. This is useful to create dynamic data providers that provide record content only on request.

	//Browser Client
	ds.record.getRecord( 'stock/HXTO' )
		.subscribe('ask-price', function( askPrice ){
			//Will be called every time the ask-price for HXTO changes
		});

	//Data Provider process on the backend that integrates deepstream with
	//a stock data source
	ds.record.listen( 'stock/*', function( recordName, isSubscribed ){
		var stockSymbol = recordName.replace( 'stock/', '' ),
			stockRecord = ds.record.getRecord( recordName );

		stockDataSource.getData( stockSymbol. function( stockData ){
			stockRecord.set( stockData );
		});
	});
