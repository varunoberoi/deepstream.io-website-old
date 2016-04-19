{
		"title": "Using PassportJS for Facebook and Twitter oAuth",
		"dateISO": "20160411",
		"author": "yasserf",
		"thumbnail": "PassportJS.png"
}

Let's face it, we each have multiple user profiles, and maintaining all those different passwords just never worked. So when open auth got introduced we let out a sigh of relief knowing those days are behind us. Behold, the second sigh, where deepstream can use those same tokens to authenticate your users!

In this blog we'll be looking at using the power of [express](//expressjs.com/), [PassportJS](//PassportJS.org/) and a nifty [plugin](//github.com/demux/use-express-middleware) by [@arnary](//twitter.com/arnary) to allow us to automatically login using facebook or twitter.

# What is PassportJS?

Before we get started, it's certainly worth looking at [PassportJS](//PassportJS.org/). It's an authentication middleware for Node.js that currently supports login over 300 strategies, including Facebook, Twitter and Github.

# Why use it with deepstream?

deepstream has a powerful permissioning handler which can allow you to implement any type of user validation. By combining it with PassportJS we can authenticate users by checking if their session token is valid and determine if they can login accordingly.

# How can it be done?

I would recommend looking at the express/PassportJS Facebook [example](//github.com/passport/express-4.x-facebook-example/blob/master/server.js) to get an idea how it works, but the idea is pretty simple, let's take Facebook as an example:

1. Load your application
2. Request to login via Facebook
3. Login to facebook ( if not already logged in )
4. Connect to deepstream

Let's take a look at how we the three different parts are implemented.

#### PassportJS

PassportJS needs to be initialised and the desired Strategies added. In this example Facebook.

```javascript
var passport = require( 'passport' );
var passportFacebook = require( 'passport-facebook' );

var initialisedPassport = passport.initialize();
var passportSession = passport.session();

passport.serializeUser( function( user, cb ) {
	cb( null, user );
} );

passport.deserializeUser( function( obj, cb ) {
	cb( null, obj );
} );

passport.use( new passportFacebook( {
				clientID: FACEBOOK_ID,
				clientSecret: FACEBOOK_SECRET,
				callbackURL: '//localhost/login/facebook/return'
		},
		( accessToken, refreshToken, profile, cb ) => {
				return cb( null, profile );
} ) );
```

#### Express

```javascript
var http = require( 'http' );
var express = require( 'express' );
var expressSession = require( 'express-session' );

var app = express();
var httpServer = http.createServer(app);
var session = expressSession({
	secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',
	resave: false,
	saveUninitialized: false,
	name: 'sid'
});

app.use( express.static( '../client' ) );
app.use( session );
app.use( initialisedPassport );
app.use( passportSession );

app.get( '/login/facebook', passport.authenticate('facebook') );

app.get( '/login/facebook/return', 
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		( req, res ) => {
				res.redirect('/');
} );
```

#### Deepstream

```javascript
var middleware = [ session, initialisedPassport, passportSession ];
var Deepstream = require( 'deepstream.io' );
var PermissionHandler = require( './permission-handler' );

var deepstream = new Deepstream();
deepstream.set( 'urlPath', '/deepstream' );
deepstream.set( 'httpServer', httpServer );
deepstream.set( 'permissionHandler', {
	isValidUser: function( connectionData, authData, callback ) {
		useExpressMiddleware( connectionData.headers, middleware, ( req, res ) => {
			if( req.user ) {
				callback( null, req.user.id );
			} else {
				callback( 'Login Denied' );
			}
			} );
	},
	canPerformAction: function( id, message, callback ) {
		callback( null, true );
	}
});
deepstream.start();

httpServer.listen( config.HTTP_PORT, function() {
	console.log( 'HTTP server listening on', process.env.HTTP_PORT );
} );
```

And that's it! PassportJS and Express take care of actually allowing the user to create and store a session, and deepstream then uses the PermissionHandler to authenticate connection has a valid session id.

You can see a working application using both Facebook and Twitter here. You have to setup a [Facebook](//developers.facebook.com/docs/apps/register) and [Twitter](//apps.twitter.com/) application to get you application key and secret.

<img src="PassportJS.gif" alt="PassportJS with Facebook" />

<a class="mega" href="//github.com/deepstreamIO/ds-tutorial-passport-auth"><i class="fa fa-github"></i>PassportJS with Facebook and Twitter</a>