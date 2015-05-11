Properties
----------------------------------
<table class="mini">
<tbody>

<tr>
<td>name</td>
<td>String</td>
<td>The name of the record, as specified when calling ds.record.getRecord()</td>
</tr>

<tr>
<td>usages</td>
<td>Number</td>
<td>The number of active subscriptions to this record by this client</td>
</tr>

<tr>
<td>isReady</td>
<td>Boolean</td>
<td>True once the record has received its current data and emitted 'ready'</td>
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

whenReady()
---------------------------------------------------
Convenience method. Gets executed straight away if the record is ready or scheduled for callback once the record is ready.

get( path )
---------------------------------------------------
argument: path
type: String
optional: true
desc: A particular path within the JSON structure that should be retrieved.

Returns the entire record's data if called without a path or the value of a specific path within the record's
data structure. Paths are expressed as JSON, e.g. `record.get( 'user.hobbies[2]' )`. Will return undefined if the path
can't be found;
 
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

Set can be called either with just a value, e.g. `ds.record.getRecord( 'user/14' ).set({ firstname: 'Wolfram', lastname: 'Hempel' })` or with
a path and a value `ds.record.getRecord( 'user/14' ).set({ 'firstname' 'Egon' });`.


subscribe( path, callback, triggerNow )
--------------------------------------------------
argument: path
type: String
optional: true
desc: A particular path within the JSON structure that should be subscribed to

argument: callback
type: Function
optional: false
desc: A callback function that should be called whenever the value changes

argument: triggerNow
type: Boolean
optional: true
desc: If true, the callback function will be called immediatly with the current value.

Subscribe registers a callback that will be notified whenever the value changes. It can be called with just a callback function,
a callback and a path to subscribe to or all three arguments.

	shoppingCart = ds.record.getRecord( 'shopping-cart/4322' );
	renderPrice = function( price ) {
		document.getElementById( 'price' ).innerHTML = price;
	};
	shoppingCart.subscribe( 'price', renderPrice, true );

unsubscribe( path, callback )
--------------------------------------------------
argument: path
type: String
optional: true
desc: The path that was previously used to subscribe

argument: callback
type: Function
optional: false
desc: The previously registered callback function

Removes a subscription that was previously made using record.subscribe()

Can be called with a path to remove the callback for this specific
path or only with a callback which removes it from the generic subscriptions

Please Note: unsubscribe is a purely client side operation. If the app is no longer
interested in receiving updates for this record from the server it needs to call
discard instead

discard()
-----------------------------------------------------
Removes all change listeners and notifies the server that the client is
no longer interested in updates for this record

delete()
-----------------------------------------------------
Deletes the record on the server. This action deletes the record for all users and is irreversible.

</div>