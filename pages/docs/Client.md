deepstream( url, options )
------------------------------
argument: url
type: String
optional: false
desc: A url in the format &lt;host&gt;:&lt;port&gt;

argument: options
type: Object
optional: true
desc: A map of options. Please read the segment on <a href="client_options.html">Client Options</a> for details

</tbody></table>


Events
-----------------------------
### connectionStateChanged <connectionState>
Emitted everytime the connectionState changes. The connectionState is passed to the callback and can also be retrieved using <a href="#getConnectionState()">getConnectionState()</a>. Please find a list of connectionStates <a href="#Connection States">here</a>.

### error
Aggregates all errors that are encountered. Some errors like `CONNECTION_ERROR` or `MESSAGE_PARSE_ERROR` are exlusively emitted
by the client, others like `ACK_TIMEOUT` or `VERSION_EXISTS` that relate to a specific Record, Event or RPC are emitted first by the object
they relate to and are then forwarded to the client.

Connection States
-----------------------------
<table class="mini">

<tr>
<td>CLOSED</td>
<td>Connection state after the client has been closed, either as a result of calling `close()` or due to a disconnect
	and multiple failed reconnection attempts.

	Please note: The initial state after the client was created is not 'CLOSED', but 'AWAITING_AUTHENTICATION'
</td>
</tr>

<tr>
<td>AWAITING_AUTHENTICATION</td>
<td>State after the client was created, but before `login()` was called.</td>
</tr>

<tr>
<td>AUTHENTICATING</td>
<td>State after the `login()` was called, but before the response was received.</td>
</tr>

<tr>
<td>OPEN</td>
<td>State after a successful login.</td>
</tr>

<tr>
<td>ERROR</td>
<td>State after a unrecoverable connection error occured.</td>
</tr>

<tr>
<td>RECONNECTING</td>
<td>State while the client is trying to reconnect.</td>
</tr>

</table>

Errors
---------------------------------
<table class="mini">

<tr>
<td>CONNECTION_ERROR</td>
<td>Either the Engine.io or TCP connection has encountered an error</td>
</tr>

<tr>
<td>UNSOLICITED_MESSAGE</td>
<td>A message was received that the client didn't expect, e.g. an update for a record that the client isn't subscribed to. This doesn't necessarily have to be an error, but can also be the result of messages crossing on the wire, e.g. when an outgoing record discard and an incoming message overlap.</td>
</tr>

<tr>
<td>MESSAGE_PARSE_ERROR</td>
<td>The client has received a syntactically incorrect message</td>
</tr>

<tr>
<td>IS_CLOSED</td>
<td>Emitted when the client tries to authenticate against an already closed connection.</td>
</tr>

<tr>
<td>VERSION_EXISTS</td>
<td>The client has tried to update a record to a version that the server already has. This might happen if multiple clients try to update the same record at the same time. The best thing to do might be to wait a few milliseconds for the record update to come in and then try again. This error will also be emitted by the affected Record.</td>
</tr>

<tr>
<td>NOT_AUTHENTICATED</td>
<td>Emitted if an operation is attempted before the client is authenticated (before `login()` has been called and a response was received.)</td>
</tr>

<tr>
<td>ACK_TIMEOUT</td>
<td>The acknowledgement response for a record subscription, event subscription or rpc call hasn't been received in time. This error is also emitted by the object that encountered it, e.g. the Record or Rpc.</td>
</tr>

<tr>
<td>LISTENER_EXISTS</td>
<td>Emitted when `ds.record.listen( pattern, callback )` is called more than once for the same pattern</td>
</tr>

<tr>
<td>NOT_LISTENING</td>
<td>Emitted when `ds.record.unlisten( pattern )` is called for a pattern that no listener exists for.</td>
</tr>

<tr>
<td>TOO_MANY_AUTH_ATTEMPTS</td>
<td>Emitted when the client has made more invalid authentication attempts than the server accepts. This can be configured as `maxAuthAttempts` on the server.</td>
</tr>

</table>

login( authParams, callback )
-----------------------------
argument: authParams
type: Object
optional: false
desc: An object with authentication parameters, e.g. `{ username: 'PeterA', password: 'sesame' }`

argument: callback
type: Function
optional: true
desc: A function that will be called once the response to the authentication request is received.

Authenticates the client against the server. To learn more about how authentication works, please have a look at the [Authentication and Permissioning tutorial](../tutorials/authentication_and_permissioning.html).

Callback will be called with three arguments: success (Boolean), errorEvent (String) and errorMessage (String) 

	var deepstream = require( 'deepstream.io-client-js' );

	ds = deepstream( 'localhost:6020' );

	// ds.getConnectionState() will now return 'AWAITING_AUTHENTICATION'

	ds.login({ username: 'PeterA', password: 'sesame' }, function( success, errorEvent, errorMessage ){
		if( success ) {
			// start application
			// ds.getConnectionState() will now return 'OPEN'
		} else {
			alert( errorMessage );
			// ds.getConnectionState() will now return 'AWAITING_AUTHENTICATION' or 'CLOSED' if the maximum number
			// of authentication attempts has been exceeded.
		}
	});

	// ds.getConnectionState() will now return 'AUTHENTICATING'

close()
-----------------------------
Closes the connection to the server. 

	ds.on( 'connectionStateChanged', function( connectionState ){
		// will be called with 'CLOSED' once the connection is successfully closed.
	});

	ds.close();

getConnectionState()
-----------------------------
Returns the current connectionState. Please find a list of available connectionStates <a href="#Connection States">here</a>.

getUid()
-----------------------------
Returnes a unique id. The uid starts with a Base64 encoded timestamt to allow for semi-sequentual ordering and ends in a random string.

	ds.getUid() // 'i9i6db5q-1xak1s2sfzk'

</div>
