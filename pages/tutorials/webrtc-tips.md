{
	"title": "WebRTC Tips",
	"description": "General tips and implementation advice for working with WebRTC"
}
WebRTC implementation tips
============================
A collection of things we found useful when working with WebRTC

### Use the WebRTC adapter
Deepstream expects a standard-compliant WebRTC API – which is almost here. To bridge implementation differences and ensure backwards compatibility in the meantime, the WebRTC initiative offers an [adapter script]( https://github.com/webrtc/adapter) which we highly recommend using for now. 

### Don’t forget to tell your video to play
HTML 5 videos don’t play by default, so don’t forget to either add an `autoplay` attribute

	<video id="localVideo" autoplay></video>

or call `play()` after attaching a stream
	
	video = document.getElementById( id );
	video.src = URL.createObjectURL( stream );
	video.play();

### Mute audio below threshold