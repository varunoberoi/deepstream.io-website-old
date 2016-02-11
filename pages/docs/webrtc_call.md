{
	"title": "WebRTC call object",
	"description": "API docs for WebRTC call"
}
Properties
-----------------------------------
<table class="mini">
<tbody>

<tr>
<td>state</td>
<td>String</td>
<td>The current state of the call. Please find a list of states below</td>
</tr>

<tr>
<td>metaData</td>
<td>Mixed</td>
<td>The metaData that was provided by the caller</td>
</tr>

<tr>
<td>callee</td>
<td>String</td>
<td>calleeName or id of the counterpary</td>
</tr>

<tr>
<td>isOutgoing</td>
<td>Boolean</td>
<td>True if this client made the call</td>
</tr>

<tr>
<td>isIncoming</td>
<td>Boolean</td>
<td>True if this client received the call</td>
</tr>

<tr>
<td>isAccepted</td>
<td>Boolean</td>
<td>True if the call was accepted</td>
</tr>

<tr>
<td>isDeclined</td>
<td>Boolean</td>
<td>True if the call was declined</td>
</tr>

</tbody>
</table>

Events
-----------------------------------
<table class="mini">

<tbody>

<tr>
<td>established</td>
<td><a href="//developer.mozilla.org/en/docs/Web/API/MediaStream">HTML5 MediaStream</a> remoteStream</td>
<td>Emitted once the call was accepted</td>
</tr>

<tr>
<td>declined</td>
<td>String reason</td>
<td>Emitted if the other party calls <code>call.decline( reason );<code> </td>
</tr>

<tr>
<td>error</td>
<td>Error error</td>
<td>Emitted if an error occured. This can be recoverable, if the call can't be brought back, <code>ended</code> will be emitted</td>
</tr>

<tr>
<td>ended</td>
<td>-</td>
<td>Emitted once the call ended. Either because one of the parties hung up or because an unrecoverable error occured</td>
</tr>

<tr>
<td>stateChange</td>
<td>String connectionState</td>
<td>Emitted if a state in the connection state occurs. Please find a list of connection states below.</td>
</tr>

</tbody>
</table>

Connection States
-----------------------------------
The connectionState can be accessed as `myCall.state`. A `stateChange` event is emitted whenever it changes.

<table class="mini">
<tbody>

<tr>
<td>INITIAL</td>
<td>The call has just been created</td>
</tr>

<tr>
<td>CONNECTING</td>
<td>An offer was send to the callee and the call is waiting to receive an accept or decline message</td>
</tr>

<tr>
<td>ESTABLISHED</td>
<td>The callee accepted the call</td>
</tr>

<tr>
<td>DECLINED</td>
<td>The callee declined the call</td>
</tr>

<tr>
<td>ENDED</td>
<td>The call has ended</td>
</tr>

<tr>
<td>ERROR</td>
<td>An error has occured</td>
</tr>

</tbody>
</table>

accept( localStream )
-----------------------
argument: localStream
type: MediaStream
optional: false
desc: An instance of a [HTML5 MediaStream](//developer.mozilla.org/en/docs/Web/API/MediaStream)

Accept an incoming call

```javascript
ds.webrtc.registerCallee( 'Egon Spengler', function( call, metaData ){
	getUserMedia({ video: true, audio: true }, function( localStream ){
		call.accept( localStream );
	}, function( error ){
		throw error;
	});
});
```

decline( reason )
-----------------------
argument: reason
type: String
optional: true
desc: A reason why the call was declined

Decline an incoming call

```javascript
ds.webrtc.registerCallee( 'Louis Tully', function( call, metaData ){
	if( user.doNotDisturb === true ) {
		call.decline( 'Please try again later' );
	}
});
```

end()
-----------------------
End a call that's currently in progress

```javascript
$( 'button.hang-up' ).click(function(){
	call.end();
});
```

</div>