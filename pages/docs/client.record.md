{
	"title": "Record API documentation",
	"description": "the API docs for deepstream records"
}
client.record.getRecord( name )
--------------------------------
argument: name
type: String
optional: false
desc: The name / primaryKey of the record.

Retrieves or creates a [Record](Record.html) with the given name. Records are persistant datastructures
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
desc: The name / primaryKey of the record.

Retrieves or creates a [List](List.html) with the given name. Lists are arrays of recordNames that clients
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
var bindInput = function( record, path, inputElement ) {
	inputElement.on( 'change', function(){
		record.set( path, inputElement.val() );
	});

	record.subscribe( path, function( value ){
		inputElement.val( value );
	}, true );
};

user = client.record.getAnonymousRecord();

bindInput( user, 'firstname', $( 'input.firstname' ) );
bindInput( user, 'lastname', $( 'input.lastname' ) );

/**
	 + Swap the underlying record while keeping the
	 + bindings intact
 */
user.setName( 'user/Anton' );
user.setName( 'user/Wolfram' );
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

* the listen callback will only be called once with subscribed = true for the first timea matching subscription is made and once with subscribed = false once all clients have unsubscribed from the record.

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

Removes a listener that was previously registered using <a href="#client.record.listen( pattern, callback )">listen()</a>.

</div>