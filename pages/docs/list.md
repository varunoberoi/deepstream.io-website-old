List
---------------------------------
Lists are arrays of record names. Similar to records, lists can be manipulated and observed. Lists are created and retrieved using `client.record.get( &lt;name&gt; );`, e.g.

	var list = client.record.getList( 'users' );

Please see <a href="client.record.html#getList( name )">getList( name );</a> for details.


Properties
----------------------------------
<table class="mini">
<tbody>

<tr>
<td>name</td>
<td>String</td>
<td>The name of the list, as specified when calling `client.record.getList( &lt;name&gt; );`</td>
</tr>

<tr>
<td>usages</td>
<td>Number</td>
<td>The number of times `client.record.getList()` has been called for this record throughout the application</td>
</tr>

<tr>
<td>isReady</td>
<td>Boolean</td>
<td>True once the list has received its current data and emitted the `'ready'` event</td>
</tr>

</tbody>
</table>

Events
-----------------------------------
<table class="mini">
<tbody>

<tr>
<td>ready</td>
<td>Emitted once the list has received its current data from the server.</td>
</tr>

<tr>
<td>delete</td>
<td>Emitted when the list was deleted, whether by this client or by another.</td>
</tr>

<tr>
<td>discard</td>
<td>Emitted once the list was discarded.</td>
</tr>

<tr>
<td>error</td>
<td>Emitted if the list encounters an error. The error message is passed to the event callback.</td>
</tr>

</tbody>
</table>

whenReady( callback )
---------------------------------------------------
argument: callback
type: Function
optional: false
desc: A function that will be invoked as soon as the list is ready.

Convenience method that executes `callback` straight away if the list is ready or registers it as a callback for the `'ready'` event.

isEmpty()
---------------------------------------------------
Returns `false` if the list has entries or `true` if it doesn't.

getEntries()
---------------------------------------------------
Returns the current contents of the list.

setEntries( entries )
---------------------------------------------------
argument: entries
type: Array
optional: false
desc: An array of record names

Sets the contents of the list to the provided array of record names. To add or remove specific entries use `addEntry()` or `removeEntry()` respectively 

addEntry( entry )
---------------------------------------------------
argument: entry
type: String
optional: false
desc: A record name that should be added to the list

Adds a new record name to the list.

removeEntry( entry )
---------------------------------------------------
argument: entry
type: String
optional: false
desc: A record name that should be removed from the list

Removes an entry from the list. `removeEntry` will not throw any error if the entry doesn't exist.



subscribe( callback, triggerNow )
--------------------------------------------------
argument: callback
type: Function
optional: false
desc: A callback function that should be called whenever the value changes

argument: triggerNow
type: Boolean
optional: true
desc: If true, the callback function will be called immediatly with the current value.

Subscribe registers a function that will be invoked whenever the list's contents changes. 

Optionally one can also pass `true` to execute the callback function straight away with the list's current entries.

unsubscribe( callback )
--------------------------------------------------
argument: callback
type: Function
optional: false
desc: The previously registered callback function

Removes a subscription that was previously made using `list.subscribe()`

Please Note: unsubscribe is purely a client side operation. Use `discard()` to notify the server
that the app is no longer interested in this list.

discard()
-----------------------------------------------------
Removes all change listeners and notifies the server that the client is
no longer interested in updates for this list.

<div class="info">
It is important to make sure that `discard()` is called for any list that's no longer needed. If you only remove the listeners using `unsubscribe()` the server won't be notified and will continue to send updates to the client.
</div>

delete()
-----------------------------------------------------
Deletes the list on the server. This action deletes the list for all users and is irreversible.

</div>
