Record
----------------------------------
Records are one of deepstream's core features. A Record is an arbitrary JSON data structure that can be created, retrieved, updated, deleted and listened to. Records are created and retrieved using `client.record.getRecord( &lt;name 

	var record = client.record.getRecord( 'recordName' );

Please see <a href="client.record.html#getRecord( name )">getRecord( name );</a> for details.

Properties
----------------------------------
<table class="mini">
<tbody>

<tr>
<td>name</td>
<td>String</td>
<td>The name of the record, as specified when calling `client.record.getRecord( &lt;name&gt; );`</td>
</tr>

<tr>
<td>usages</td>
<td>Number</td>
<td>The number of times `client.record.getRecord()` has been called for this record throughout the application</td>
</tr>

<tr>
<td>isReady</td>
<td>Boolean</td>
<td>True once the record has received its current data and emitted the `'ready'` event</td>
</tr>

<tr>
<td>isDestroyed</td>
<td>Boolean</td>
<td>True once the record has been discarded or deleted</td>
</tr>

</tbody>
</table>

Events
-----------------------------------
<table class="mini">
<tbody>

<tr>
<td>ready</td>
<td>Emitted once the record has received its current data from the server.</td>
</tr>

<tr>
<td>delete</td>
<td>Emitted when the record was deleted, whether by this client or by another.</td>
</tr>

<tr>
<td>discard</td>
<td>Emitted once the record was discarded.</td>
</tr>

<tr>
<td>error</td>
<td>Emitted if the record encounters an error. The error message is passed to the event callback.</td>
</tr>

</tbody>
</table>

whenReady( callback )
---------------------------------------------------
argument: callback
type: Function
optional: false
desc: A function that should be invoked as soon as the record is ready.

Convenience method that executes the callback straight away if the record is ready or registers it as a callback for the `'ready'` event.

get( path )
---------------------------------------------------
argument: path
type: String
optional: true
desc: A particular path within the JSON structure that should be retrieved.

`get()` is used to return the record's data. If called without an argument it returns all the data. Alternatively you can call it with a path string to only retrieve a specific part. If this path can't be found, `get()` will return `undefined`.

	
	var record = client.record.getRecord( 'user/14' );

	record.set({
		personalData: {
			firstname: 'Homer',
			lastname: 'Simpson'
		}
		children: [ 'Bart', 'Maggie', 'Lisa' ]
	});

	record.get(); // Returns entire object
	record.get( 'children[1]' ); // 'Maggie'
	record.get( 'personalData.firstname' ); // 'Homer';



 
set( path, value )
---------------------------------------------------
argument: path
type: String
optional: true
desc: A particular path within the JSON structure that should be set.

argument: value
type: Various
optional: false
desc: The value the record or path should be set to

Set is used to set the record's data. It can be called with just a value or with a path and a value.

	var record = client.record.getRecord( 'user/14' );

	// Set the entire record's data
	record.set({
		personalData: {
			firstname: 'Homer',
			lastname: 'Simpson'
		}
		children: [ 'Bart', 'Maggie', 'Lisa' ]
	});

	// Update only firstname
	record.set( 'personalData.firstname', 'Marge' );



subscribe( path, callback, triggerNow )
--------------------------------------------------
argument: path
type: String
optional: true
desc: A path within the JSON structure that should be subscribed to

argument: callback
type: Function
optional: false
desc: A callback function that should be called whenever the value changes

argument: triggerNow
type: Boolean
optional: true
desc: If true, the callback function will be called immediatly with the current value.

Subscribe registers a function that will be invoked whenever the record's value changes. You can subscribe to all changes off the record's data by just providing a callback function or to changes of a specific path within the record.

Optionally one can also pass `true` to execute the callback function straight away with the record's current value.

	shoppingCart = ds.record.getRecord( 'shopping-cart/4322' );

	// Subscribe to any change of the record
	shoppingCart.subscribe(function( data ){
		// do stuff...
	});

	// Only subscribe to price changes and add true to run 
	// renderPrice straight away for the current price
	renderPrice = function( price ) {
		document.getElementById( 'price' ).innerHTML = price;
	};
	shoppingCart.subscribe( 'price', renderPrice, true );

unsubscribe( path, callback )
--------------------------------------------------
argument: path
type: String
optional: true
desc: The path that was previously used for subscribe

argument: callback
type: Function
optional: false
desc: The previously registered callback function

Removes a subscription that was previously made using `record.subscribe()`

Can be called with a path to remove the callback for this specific
path or only with a callback which removes it from the generic subscriptions

Please Note: unsubscribe is purely a client side operation. Use `discard()` to notify the server
that the app is no longer interested in this record.

discard()
-----------------------------------------------------
Removes all change listeners and notifies the server that the client is
no longer interested in updates for this record.

<div class="info">
It is important to make sure that `discard()` is called for any record that's no longer needed. If you only remove the listeners using `unsubscribe()` the server won't be notified and will continue to send updates to the client.
</div>

delete()
-----------------------------------------------------
Deletes the record on the server. This action deletes the record for all users and is irreversible.

</div>