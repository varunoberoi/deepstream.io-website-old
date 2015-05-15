client.record.getRecord( name )
--------------------------------
argument: name
type: String
optional: false
desc: The name / primaryKey for the record.

Retrieves or creates a [Record](Record.html) with the given name. Records are persistant datastructures
that clients can manipulate and observe.

	// clientA
	var user = client.record.getRecord( 'user/14' );

	user.subscribe( 'age', function( age ){
		alert( 'Happy Birthday ' + user.get( 'firstname' ) );
	});

	// clientB
	client.record.getRecord( 'user/14' ).set( 'age', 30 );

client.record.getList( name )
--------------------------------
argument: name
type: String
optional: false
desc: The name / primaryKey for the record.

Retrieves or creates a [List](List.html) with the given name. Lists are arrays of recordNames that clients
can manipulate and observe.

	var beatlesAlbums = client.record.getList( 'beatlesAlbums' );

	beatlesAlbums.whenReady(function(){

		/*
		 * Returns
		 * [
		 *		"album/i9l0z34v-109vblpqddy", 
		 *		"album/i9l0z3v4-ibrbp139rbr", 
		 *		"album/i9l0z4d8-1w0p8xnk1sy" 
		 *	]
		 */
		beatlesAlbums.getEntries();
	});

client.record.getAnonymousRecord()
--------------------------------
argument: name
type: String
optional: false
desc: The name / primaryKey for the record.

Returns an [AnonymousRecord](AnonymousRecord). 

An AnonymousRecord is a record without a predefined name. It
acts like a wrapper around an actual record that can
be swapped out for another one whilst keeping all bindings intact.

Imagine a customer relationship management system with a list of users
on the left and a user detail panel on the right. The user detail
panel could use the anonymous record to set up its bindings. 

Whenever a user is chosen from the list of existing users, the anonymous record's
`setName()` method is called and the detail panel will update to
show the selected user's details.

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
	 * Swap the underlying record while keeping the
	 * bindings intact
	 */
	user.setName( 'user/Anton' );
	user.setName( 'user/Wolfram' );



client.record.listen( pattern, callback )
--------------------------------
argument: name
type: String
optional: false
desc: A RegExp as a string

argument: name
type: String
optional: false
desc: A function that will be called

Allows to listen for record subscriptions made by this or other clients. This
is usefull to create "active" data providers, e.g. providers that only provide
data for a particular record if a user is actually interested in it

	client.record.listen( 'raceHorse/.*', function( match, isSubscribed ) {
		/*
		 * match === 'raceHorse/fast-betty'
		 * isSubscribed === true
		 *
		 * Provide updates for fast-betty here
		 */
	});

	client.record.getRecord( 'raceHorse/fast-betty' );

client.record.unlisten( pattern )
--------------------------------