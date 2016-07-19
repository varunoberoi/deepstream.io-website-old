{
	"title": "Record API documentation",
	"description": "the API docs for deepstream records"
}


client.record.getRecord( name )
--------------------------------
argument: name
type: String
optional: false
desc: The name of the record.

Retrieves or creates a [Record](record.html) with the given name. Records are persistant datastructures
that clients can manipulate and observe.

```javascript
// clientA
var user = client.record.getRecord( 'user/14' );

user.subscribe( 'age', function( age ){
	alert( 'Happy Birthday ' + user.get( 'firstname' ) );
});

// clientB
client.record.getRecord( 'user/14' ).set( 'age', 30 );
```

client.record.getList( name )
--------------------------------
argument: name
type: String
optional: false
desc: The name of the record.

Retrieves or creates a [List](list.html) with the given name. Lists are arrays of recordNames that clients
can manipulate and observe.

```javascript
var beatlesAlbums = client.record.getList( 'beatlesAlbums' );

beatlesAlbums.whenReady(function(){

	beatlesAlbums.getEntries();
	/*
		 + Returns e.g.
		 + [
		 +		"album/i9l0z34v-109vblpqddy", 
		 +		"album/i9l0z3v4-ibrbp139rbr", 
		 +		"album/i9l0z4d8-1w0p8xnk1sy" 
		 +	]
	 */
});
```

client.record.getAnonymousRecord()
--------------------------------
Returns an [AnonymousRecord](anonymous_record.html). 

An AnonymousRecord is a record without a predefined name. It
acts as a wrapper around an actual record that can
be swapped out for another one whilst keeping all bindings intact.

```javascript
const bindInput = (record, path, inputElement) => {
  inputElement.addEventListener('change', () => {
    record.set(path, inputElement.value)
  })
  record.subscribe(path, value => {
    inputElement.value = value
  }, true)
}

const user = client.record.getAnonymousRecord()
const QS = document.querySelector.bind(document)
bindInput(user, 'firstname', QS('input.firstname'))
bindInput(user, 'lastname', QS('input.lastname'))

/**
  * Swap the underlying record while keeping the
  * bindings intact
 */
user.setName('user/Anton')
user.setName('user/Wolfram')
```

client.record.has( name, callback )
--------------------------------
argument: name
type: String
optional: false
desc: The name / primaryKey of the record.

argument: callback
type: Function
optional: false
desc: A function that will be called with a boolean to indicate whether the record exists. Arguments are (String) error and (Boolean) hasRecord

Returns a boolean to indicate whether or not the record exists in deepstream. This is useful to avoid creating a record via `getRecord( name )` if you only want to edit the contents.

```javascript
// clientA
var user = client.record.has( 'user/14', function( error, hasRecord ) {
	if( error ) {
		// an error has occured trying to retrieve the record from 
		// the cache or storage layer in deepstream
	} else if( hasRecord === true )
		// record exists on deepstream
	} else if( hasRecord === false )
		// record doesn't exist on deepstream
	}
} );
```

client.record.snapshot( name, callback )
--------------------------------
argument: name
type: String
optional: false
desc: The name / primaryKey of the record.

argument: callback
type: Function
optional: false
desc: A function that will be called with a snapshot of the record data. Arguments are (String) error and (Object) data

Returns the record content without making a subscription to the server. This can be used to avoid scenarios where you would request the record and discard 
it immediately afterwards.

```javascript
// clientA
var user = client.record.snapshot( 'user/14', function( error, data ) {
	if( error ) {
		if( error === C.EVENT.RECORD_NOT_FOUND ) {
			// record does not exist on the server, similar to a 404
		} else {
			// an error has occured trying to retrieve the record from 
			// the cache or storage layer in deepstream
		}
	} else {
			// use data
	}
} );
```

client.record.listen( pattern, callback )
--------------------------------
argument: pattern
type: String
optional: false
desc: A RegExp as a string

argument: callback
type: Function
optional: false
desc: A function that will be called whenever a match is found. Arguments are (String) match and (Boolean) isSubscribed

Allows to listen for record subscriptions made by any client. This
is usefull to create "active" data providers, e.g. providers that only provide
data for records that users are actually interested in.

Some things to note:

* the listen callback will only be called once with subscribed = true for the first time a matching subscription is made and once with subscribed = false once all clients have unsubscribed from the record.

* The callback will be called for all matching subscriptions that already exist at the time its registered.

```javascript
var raceHorseRecords = {};

client.record.listen( 'raceHorse/.*', function( match, isSubscribed ) {
	/*
		 + match = 'raceHorse/fast-betty'
		 + isSubscribed = true
	 */
	var horseName = match.split( '/' )[ 1 ],
		updateRecord = function( data ){
			raceHorseRecords[ match ].set( data );
		};
	
	if( isSubscribed ) {
		raceHorseRecords[ match ] = client.record.getRecord( match );

		// assuming we have a raceHorseDataProvider class
		raceHorseDataProvider.subscribe( horseName, updateRecord );
	} else {
		raceHorseRecords[ match ].discard();
		delete raceHorseRecords[ match ];
		raceHorseDataProvider.unsubscribe( horseName, updateRecord );
	}
});

// This function will now be called whenever a client requests a record
// with a matching name, e.g.
client.record.getRecord( 'raceHorse/fast-betty' );
```

client.record.unlisten( pattern )
--------------------------------
argument: pattern
type: String
optional: false
desc: A RegExp as a string

Removes a listener that was previously registered using <a href="#client.record.listen(pattern,callback)">listen()</a>.

</div>
