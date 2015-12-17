{
	"title": "Transforming outgoing data",
	"description": "Learn how to use transform functions to manipulate data before it leaves the server"
}
Transforming outgoing data
======================================
Deepstream allows to manipulate data before it leaves the server. This can be useful for a number of usecases 

* adding trusted data like usernames to outgoing RPCs
* removing confidential information from record data before it is send to clients
* modifying values based on the user they are sent to, e.g. applying user specific discounts to prices

### How to manipulate data
Data transformation functions can be registered for all TOPIC / ACTION combinations that send out data.

<table class="mini">
	<thead>
		<tr>
			<th>TOPIC</th>
			<th>ACTION</th>
			<th>description</th>
			<th>meta data</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>RPC</td>
			<td>REQUEST</td>
			<td>
				message from server to RPC provider<br />
				result of <code>ds.rpc.make( name, data, callback )</code>
			</td>
			<td>sender, receiver, rpcName</td>
		</tr>
		<tr>
			<td>RPC</td>
			<td>RESPONSE</td>
			<td>response from RPC provider on the way back to its requestor, result of <code>response.send( data )</code></td>
			<td>sender, receiver, rpcName</td>
		</tr>
		<tr>
			<td>EVENT</td>
			<td>EVENT</td>
			<td>data associated with an event send with <br /><code>ds.event.emit( name, data )<code></td>
			<td>sender, receiver, eventName</td>
		</tr>
		<tr>
			<td>RECORD</td>
			<td>READ</td>
			<td>response to a record subscription made with <br /><code>ds.record.getRecord()</code></td>
			<td>recordName, version, receiver</td>
		</tr>
		<tr>
			<td>RECORD</td>
			<td>UPDATE</td>
			<td>full record update,<br />result of <code>ds.record.set({})</code></td>
			<td>recordName, version, receiver</td>
		</tr>
		<tr>
			<td>RECORD</td>
			<td>PATCH</td>
			<td>partial record update,<br />result of <code>ds.record.set(path, value)<code></td>
			<td>recordName, version, receiver, path</td>
		</tr>
	</tbody>
</table>

Transform-functions are registered using `server.set( 'dataTransforms', [...])`

	var Deepstream = require( 'deepstream.io' );
	var server = new Deepstream();

	server.set( 'dataTransforms', [{
		topic: C.TOPIC.RPC,
		action: C.ACTIONS.REQUEST,
		transform: function( data, metaData ) {
			if( metaData.rpcName === 'get-price' ) {
				data.discount = userDiscounts[ metaData.sender ];
			}
			return data;
		}
	},{
		topic: C.TOPIC.RECORD,
		action: C.ACTIONS.READ,
		transform: function( data, metaData ) {
			delete data.confidentialInfo;
			return data;
		}
	}]);

	server.start();

### Transforming record data

Transforming outgoing record data can be a bit complex, due to the different ways that updates are sent out. 
* When a client calls `ds.record.getRecord( recordName )` the server responds with a READ action. 
* When a record is completely updated, using `record.set({})` with a single argument, an UPDATE action is sent out. 
* In case of partial updates, using `record.set(path, value)`, a PATCH message is sent out, containing the path and only the updated value. 

When manipulating outgoing record-data, all three cases need to be taken into account.

The following example shows how a user-discount would be applied to the price of an item, assuming
* record names are structured as item/&lt;id&gt;
* record data looks like { price: &lt;id&gt;, other: &lt;...&gt; }


	var userDiscounts = {
		'anne': 0.97,
		'max': 0.90,
		'lisa': 0.85
	};

	// READ and UPDATE have the same signature,
	// so we can use the same function for both
	var transformReadAndUpdate = function( data, metaData ) {
		if( metaData.recordName.substr( 0, 5 ) === 'item/' ) {
			data.price *= userDiscounts[ metaData.receiver ];
		}
		return data;
	};

	server.set( 'dataTransforms', [{
		topic: C.TOPIC.RECORD,
		action: C.ACTIONS.READ,
		transform: transformReadAndUpdate
	}, {
		topic: C.TOPIC.RECORD,
		action: C.ACTIONS.UPDATE,
		transform: transformReadAndUpdate
	},{
		topic: C.TOPIC.RECORD,
		action: C.ACTIONS.PATCH,
		transform: function( data, metaData ) {
			if( 
				metaData.recordName.substr( 0, 5 ) === 'item/' &&
				metaData.path === 'price'
			) {
				//data for PATCH is just the price
				return data * userDiscounts[ metaData.receiver ];
			} else {
				return data;
			}
		}
	}]);

<div class="hint-box fa fa-gears">
	<h3>BUT!...</h3>
	<p>Transforming data slows deepstream down quite a bit. Usually, messages are constructed once and
	fanned out to all subscribed clients. If a transform function is registered however, messages are constructed
	for every receiver specifically which can add considerable overhead. So: Use with caution and do as little as possible
	in your transform function.</p>
</div>