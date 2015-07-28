{
	"title": "client options",
	"description": "the options that the deepstream javascript client can be initialized with"
}
Client Options
---------------------------------

<table class="mini">
<thead>
<tr>
<th>option</th>
<th>type</th>
<th>default</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="option">reconnectIntervalIncrement</td>
<td class="type">Number</td>
<td class="default">4000</td>
<td class="description">
Specifies the number of milliseconds by which the time until the next reconnection attempt will be incremented after every unsuccessful attempt.<br />E.g.for 1500: if the connection is lost,the client will attempt to reconnect immediately, if that fails it will try again after 1.5 seconds, if that fails it will try again after 3 seconds and so on...
</td>
</tr>

<tr>
<td class="option">maxReconnectAttempts</td>
<td class="type">Number</td>
<td class="default">5</td>
<td class="description">
The number of reconnection attempts until the client gives up and declares the connection closed.
</td>
</tr>

<tr>
<td class="option">rpcAckTimeout</td>
<td class="type">Number</td>
<td class="default">6000</td>
<td class="description">
The number of milliseconds after which a rpc will create an error if no Ack-message has been received.
</td>
</tr>

<tr>
<td class="option">rpcResponseTimeout</td>
<td class="type">Number</td>
<td class="default">10000</td>
<td class="description">
The number of milliseconds after which a rpc will create an error if no response-message has been received.
</td>
</tr>

<tr>
<td class="option">subscriptionTimeout</td>
<td class="type">Number</td>
<td class="default">2000</td>
<td class="description">
The number of milliseconds that can pass after providing/unproviding a RPC or subscribing/unsubscribing/listening to a record before an error is thrown.
</td>
</tr>

<tr>
<td class="option">maxMessagesPerPacket</td>
<td class="type">Number</td>
<td class="default">100</td>
<td class="description">
If the implementation tries to send a large number of messages at the same
time, the deepstream client will try to split them into smaller packets and send
these every &lt;timeBetweenSendingQueuedPackages&gt;ms.

This parameter specifies the number of messages after which deepstream sends the
packet and queues the remaining messages. Set to Infinity to turn the feature off.
</td>
</tr>

<tr>
<td class="option">timeBetweenSendingQueuedPackages</td>
<td class="type">Number</td>
<td class="default">16</td>
<td class="description">
Please see description for maxMessagesPerPacket. Sets the time in ms.
</td>
</tr>

<tr>
<td class="option">recordReadAckTimeout</td>
<td class="type">Number</td>
<td class="default">1000</td>
<td class="description">
The number of milliseconds from the moment client.record.getRecord() is called until an error is thrown since no ack message has been received.
</td>
</tr>

<tr>
<td class="option">recordReadTimeout</td>
<td class="type">Number</td>
<td class="default">3000</td>
<td class="description">
The number of milliseconds from the moment client.record.getRecord() is called until an error is thrown since no data has been received.
</td>
</tr>

<tr>
<td class="option">recordDeleteTimeout</td>
<td class="type">Number</td>
<td class="default">3000</td>
<td class="description">
The number of milliseconds from the moment record.delete() is called
until an error is thrown since no delete ack message had been received. Please
take into account that the deletion is only complete after the record has been
deleted from both cache and storage.
</td>
</tr>

<tr>
<td class="option">upgrade</td>
<td class="type">Boolean</td>
<td class="default">true</td>
<td class="description">
Whether the client should try to upgrade the transport from long-polling to something better, e.g. WebSocket.
</td>
</tr>

<tr>
<td class="option">forceJSONP</td>
<td class="type">Boolean</td>
<td class="default">false</td>
<td class="description">
Forces JSONP for polling transport.
</td>
</tr>

<tr>
<td class="option">jsonp</td>
<td class="type">Boolean</td>
<td class="default">true</td>
<td class="description">
Determines whether to use JSONP when
necessary for polling. If disabled (by settings to false)
an error will be emitted (saying "No transports available")
if no other transports are available. If another transport
is available for opening a connection (e.g. WebSocket)
that transport will be used instead.
</td>
</tr>

<tr>
<td class="option">forceBase64</td>
<td class="type">Boolean</td>
<td class="default">false</td>
<td class="description">
Forces base 64 encoding for polling transport even when XHR2 responseType is available and WebSocket even if the used standard supports binary.
</td>
</tr>

<tr>
<td class="option">enablesXDR</td>
<td class="type">Boolean</td>
<td class="default">false</td>
<td class="description">
Enable Cross Domain Requests for IE8 to avoid loading the bar flashing click sounds. Default to false because Cross Domain Requests can't send cookies.
</td>
</tr>

<tr>
<td class="option">timestampRequests</td>
<td class="type">Boolean</td>
<td class="default">false</td>
<td class="description">
Whether to add the timestamp with each transport request. Note: this is ignored if the browser is IE or Android, in which case requests are always stamped.
</td>
</tr>

<tr>
<td class="option">timestampParam</td>
<td class="type">String</td>
<td class="default">'t'</td>
<td class="description">
The GET parameter key to use for the timestamp.
</td>
</tr>

<tr>
<td class="option">path</td>
<td class="type">String</td>
<td class="default">'/engine.io'</td>
<td class="description">
The path to connect to for engine.io connections.
</td>
</tr>

<tr>
<td class="option">transports</td>
<td class="type">Array</td>
<td class="default">[ 'polling', 'websocket' ]</td>
<td class="description">
A list of transports to try (in order). Engine.io always  attempts to connect directly with the first one, provided the feature detection test for it passes.
</td>
</tr>

<tr>
<td class="option">rememberUpgrade</td>
<td class="type">Boolean</td>
<td class="default">false</td>
<td class="description">
If true and if the previous websocket connection to
the server succeeded, the connection attempt will bypass the normal
upgrade process and will initially try websocket. A connection
attempt following a transport error will use the normal upgrade
process. It is recommended you turn this on only when using
SSL/TLS connections, or if you know that
your network does not block websockets.
</td>
</tr>
</tbody>
</table></div>
