{
	"title": "connection state documentation",
	"description": "a list of all possible connection states"
}
Connection States
-----------------------------
<table class="mini">

<tr>
<td>CLOSED</td>
<td>Connection state after the client has been closed, either as a result of calling `close()` or due to a disconnect
	and multiple failed reconnection attempts.
	<br/>
	Please note: The initial state after the client was created is not 'CLOSED', but 'AWAITING_AUTHENTICATION'
</td>
</tr>

<tr>
<td>AWAITING_CONNECTION</td>
<td>State after the client was created and no connection ack was recieved</td>
</tr>

<tr>
<td>CHALLENGING</td>
<td>State after the connected server requests you for your current url. This can be used for providing TCP redirects.</td>
</tr>

<tr>
<td>AWAITING_AUTHENTICATION</td>
<td>State after the connection ack is recieved, but before `login()` was called.</td>
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
