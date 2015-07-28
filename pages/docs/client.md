{
	"title": "javascript client API documentation",
	"description": "the API docs for the deepstream javascript client"
}
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
Emitted everytime the connectionState changes. The connectionState is passed to the callback and can also be retrieved using <a href="#getConnectionState()">getConnectionState()</a>. Please find a list of connectionStates <a href="connection_states.html">here</a>.

### error
Aggregates all errors that are encountered. Some errors like `CONNECTION_ERROR` or `MESSAGE_PARSE_ERROR` are exlusively emitted
by the client, others like `ACK_TIMEOUT` or `VERSION_EXISTS` that relate to a specific Record, Event or RPC are emitted first by the object
they relate to and are then forwarded to the client. Please find a <a href="client_errors.html">list of all errors here</a>.


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

Authenticates the client against the server. To learn more about how authentication works, please have a look at the [Authentication](../tutorials/authentication.html) and [Permissioning](../tutorials/permissioning.html) tutorials.

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
