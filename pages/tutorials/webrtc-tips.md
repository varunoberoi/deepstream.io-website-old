{
	"title": "WebRTC Tips",
	"description": "General tips and implementation advice for working with WebRTC"
}
WebRTC implementation tips
============================
A collection of things we found useful when working with WebRTC

### Use the WebRTC adapter
Deepstream expects a standard-compliant WebRTC API – which is almost here. To bridge implementation differences and ensure backwards compatibility in the meantime, the WebRTC initiative offers an [adapter script]( //github.com/webrtc/adapter) which we highly recommend using for now. 

### Don’t forget to tell your video to play
HTML 5 videos don’t play by default, so don’t forget to either add an `autoplay` attribute

```html
<video id="localVideo" autoplay></video>
```

or call `play()` after attaching a stream

```javascript	
video = document.getElementById( 'localVideo' );
video.src = URL.createObjectURL( stream );
video.play();
```

### Mute your own audio
When you request a video and audio stream (`getUserMedia({ video: true, audio: true })`) and play it on a video tag, chances are that you end up with a nasty echo / feedback loop. To avoid this, mute your own audio-track by adding a muted attribute

```html
<video id="localVideo" muted></video>
```

or mute the video in code

```javascript
video = document.getElementById( 'localVideo' );
video.muted = true;
```

### Specify a resolution for multi-user chats
If you are building an application that allows multiple users to chat with each other at the same time, you might want to limit the resolution for each participants video - otherwise your connection can't keep up with the amount of data its receiving.

To do this, use the constrains object that you pass to getUserMedia, e.g.

```javascript
getUserMedia({
    audio: true,
    video: {
        width: 160,
        height: 120
    }
});
```