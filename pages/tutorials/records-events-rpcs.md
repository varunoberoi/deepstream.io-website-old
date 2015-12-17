{
	"title": "Records, Events and RPCs",
	"description": "a short overview over deepstream's core concepts"
}
Records, Events & RPCs
==============================
Deepstream provides three core concepts: Records, Events and RPCs. Records are arbitrary JSON structures that can be manipulated and subscribed to, Events work like a normal event-emitter, but distributed across connected clients and RPCs(Remote Procedure Calls) allow for request-response communication, comparable to http requests.

The functionality for each is grouped under a namespace on the client:

	var ds = require( 'deepstream.io-client-js' )( 'localhost:6020' );

	//generic methods are on the client itself
	ds.login();
	ds.getUid();
	...

	//record related methods are on client.record
	client.record.getRecord();
	client.record.getList();
	client.record.listen();
	...

	//event related methods are on client.event
	client.event.subscribe();
	client.event.emit();
	...

	//rpc related methods are on client.rpc
	client.rpc.register();
	client.rpc.make();
	...

### Records
Records are persistant data-structures. Deepstream can store them in both a distributed cache for quick read-write access and in a database for long-term storage and querying.

## Choosing a record name
Every record is identified by a unique name. This name can be any string, but we found that there are some naming conventions that help a lot with larger scale applications:

#### Use unique, randomized ids
It's tempting to use a field that could act as primary key as the recordname, e.g. `user/johndoe`, but using a UID, e.g. `user/iam7f3vy-2mgd656jrx3di` has some advantages: You don't need to ensure its uniqueness, the user can change his username later without invalidating the record and ids generated with deepstream's `ds.getUid()` method are loosely sequential (the first 8 characters are a base64 encoded) which helps databases to index them more efficiently.

<!--
<div class="hint-box fa fa-lightbulb-o">
	<h3>Won't my UIDs clash?</h3>
	<p>If you're coming from a SQL background, you're probably used to enabling <code>autoincrement</code> and leaving it to the database to work out a unique identifier via sequential numbering. This approach wouldn't work for distributed systems.</p>

	<p>Instead, deepstream provides a <code>ds.getUid()</code> method that provides random strings. These start with a timestamp – which means two identical ids would need to be generated within the same millisecond. This is not impossible, but the likelihood for it to happen is 1: 10 Quadrillion.</p>
</div>
-->
#### Organize your records in groups
Starting your recordnames with a group, e.g. `user/iam7f3vy-2mgd656jrx3di` rather than just `iam7f3vy-2mgd656jrx3di` makes them easier to organize and enables storage-connectors to create individual tables or collections per group.

#### Include a group to help with permissioning
If your system has to support multiple users or groups that are not allowed to access each others data, it might make sense to include the id of the group into the record name. This allows the permissionHandler to deny access to records straight away, if they don't belong to the user's group.

	// Client
	var ds = deepstream( '143.234.324.234:6020' );
	ds.login({ user: 'paul', pass: 'abc' });
	var rec = ds.record.getRecord( 'beatles-albums' );
	
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

### Record paths
Most record operations can be performed for the entire record or for a path within it

	var someUser = ds.record.getRecord( 'someUser' );

	//setting the entire record's data
	someRecord.set({
		firstname: 'John',
		lastname: 'Doe'
	});

	//setting only a specific path
	someRecord.set( 'firstname', 'Egon' );

	//paths can also be more complex and will create structures
	//that don't exist yet
	someRecord.set( 'hobbies[2].name', 'tap dancing' );
	
	/* Will result in
	*
	* {
	* 	firstname: 'John',
	* 	lastname: 'Doe',
	* 	hobbies: [
	* 		undefined,
	* 		undefined,
	* 		{ name: 'tap dancing' }
	* 	]
	*  }
	*/

	//paths can also be used with get and subscribe
	someRecord.get( 'lastname' ); //'Doe'
	someRecord.subscribe( 'lastname', function( lastname ){
		//will be called on the next change to lastname
	});

### unsubscribe, discard and delete
These can be a bit confusing
* **unsubscribe** removes a subscription that was previously established using `subscribe`
* **discard** notifies the server that the client is no longer interested in updates for this record.
* **delete** irreversibly deletes the record from storage and cache.


### listening for record subscriptions made by other clients
deepstream allows you to register a callback function that will be notified whenever clients subscribe to a record for the first time. This is useful to create dynamic data provider that provide record content only on request.

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