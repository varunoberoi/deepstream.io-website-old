Anonymous Record
----------------------------------

An AnonymousRecord is a record without a predefined name. It
acts as a wrapper around an actual record that can
be swapped out for another one whilst keeping all bindings intact.

Imagine a customer relationship management system with a list of users
on the left and a user detail panel on the right. The user detail
panel would use the anonymous record to set up its bindings, yet whenever
a user is chosen from the list of existing users, the anonymous record's
`setName()` method is called and the detail panel will update to
show the selected user's details

An anonymous record can be created using `client.record.getAnonymousRecord()` (see <a href="client.record.html#getRecord( name )">getAnonymousRecord()</a>), e.g.

	var selectedUser = client.record.getAnonymousRecord();

	selectedUser.subscribe( 'firstname', function( firstname ){
		$( '#firstname' ).text( firstname );
	});

	$( '#users li' ).click(function(){
		selectedUser.setName( $(this).data( 'username' ) );
	});

<div class="hint-box fa fa-gears">
	<p>An anonymous record has all the methods, events and properties of a normal <a href="record.html">record</a> plus a <code>setName()</code> method.</p></div>

setName( recordName )
---------------------------------------------------
argument: recordName
type: String
optional: false
desc: The name of the actual record the anonymousRecord should use. Can be called multiple times.

Sets the underlying record the anonymousRecord wraps around.

</div>
