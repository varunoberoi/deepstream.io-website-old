{
    "title": "Running deepstream with an Express server",
    "description": "How to attach deepstream to an Express server"
}
Running deepstream with an Express server
=================================================

![deepstream-express](../assets/images/express/deepstream-express.png)

Deepstream provides all the tools needed to create realtime functionality. However functionality like file uploads and server-side rendering can be based on the mature ecosystem already provided by http servers, such as [HTTP node](//nodejs.org/api/http.html), [Express](//expressjs.com/), [koa](//koajs.com/), [hapi](//hapijs.com/) and others.


### How to attach an Express server to deepstream?

You can pass a server to deepstream simply by setting it via the `httpServer` config. This will inform deepstream that you have a server you want to attach to instead of it spinning up its own.

The first thing we'll need to do is requires all the necessary modules to create a deepstream and express server.

```javascript
var Deepstream = require( 'deepstream.io' );
var http = require( 'http' );
var express = require( 'express' );
```

Once that is complete you can then create your express application, making sure you have a handle on the HTTP server to pass to deepstream later. You can also add your modules and paths here.

```javascript
var app = express();
var server = http.createServer(app);

app.get('/hello', function ( req, res ) {
  res.send( 'Hello to you too!' );
})
```

Now you can setup your deepstream server and configure it as appropriate. The two important settings here are `urlPath` so that deepstream only listens to a specific path for connections, since the port will now be shared and `httpServer` for it to bind connections to.

```javascript
var deepstream = new Deepstream();
deepstream.set( 'urlPath', '/deepstream' );
deepstream.set( 'httpServer', server );
deepstream.start();
```

Finally, all that is left is to start listening to the server on your port. Now you have a combination of all the goodness of deepstream and express!

```javascript
server.listen( 6020, function(){
    console.log( 'HTTP server listening on 6020' );
});
```

### What needs to change on the client?

Just a single configuration option so it knows what `urlPath` to use

```javascript
    var ds = deepstream( 'localhost:6020', {
        path: '/deepstream'
    } );
```

To see this running checkout our tutorial repo here:

<a class="mega" href="//github.com/deepstreamIO/ds-express"><i class="fa fa-github"></i>deepstream & express example</a>