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