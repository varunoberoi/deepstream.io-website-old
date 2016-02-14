{
	"title": "deepstream server documentation",
	"description": "API docs for new Deepstream();"
}
Constructor
------------------------------
The constructor takes no arguments.

```javascript
var server = new Deepstream();
```

Events
-----------------------------
### started
Emitted once `deepstream.start()` has been called and the startup procedure has completed succesfully.

### stopped
Emitted once `deepstream.stop()` has been called and the server has been completely shut down.

start()
-----------------------------
Starts the server.

stop()
-----------------------------
Stops the server.

set( key, value )
-----------------------------
argument: key
type: String
optional: false
desc: The configuration option that should be set

argument: value
type: various
optional: false
desc: The value that should be used

`set( key, value );` allows to configure the server before it is started. It supports the following options (with example values):

```javascript
/**
* A unique name for this server
*
* @type String
* @default A random ID
*/
server.set( 'serverName', 'nodeA' );

/**
* Whether the console output should be in color
*
* @type Boolean
* @default true
*/
server.set( 'colors', false );

/**
* Whether the deepstream logo should be displayed on startup
*
* @type Boolean
* @default true
*/
server.set( 'showLogo', false );

/**
* Whether or not to use a web server
*
* @type Boolean
* @default true
*/
server.set( 'webServerEnabled', true );

/**
* Whether or not to use a TCP server
*
* @type Boolean
* @default true
*/
server.set( 'tcpServerEnabled', true );

/**
* The public key to use if using ssl
* Must have an associated sslKey set
*
* @type String
*/
server.set( 'sslCert', fs.readFileSync( './keys/cert.pem', 'utf8' ) );

/**
* The private key to use if using ssl
* Must have an associated sslCert set
*
* @type String
*/
server.set( 'sslKey', fs.readFileSync( './keys/key.pem', 'utf8' ) );

/**
* The host that deepstream listens on for incoming connections from browsers
*
* @type String
* @default '0.0.0.0'
*/
server.set( 'host', 'localhost' );

/**
* The port that deepstream listens on for incoming connections from browsers
*
* @type Number
* @default 6020
*/
server.set( 'port', 80 );

/**
* The host that deepstream listens on for incoming connections via tcp
*
* @type String
* @default '0.0.0.0'
*/
server.set( 'tcpHost', 'localhost' );

/**
* The port that deepstream listens on for incoming connections via tcp
*
* @type Number
* @default 6021
*/
server.set( 'tcpPort', 80 );

/**
* A class that exposes a isValidUser and canPerformAction method. 
*
* @type PermissionHandler
* @default OpenPermissionHandler
*/
server.set( 'PermissionHandler', new LdapPermissionHandler() );

/**
* Transforms data before it leaves the server. 
* See //deepstream.io/tutorials/transforming-data.html for details
*
* @type Array
* @default null
 */
server.set( 'dataTransforms', [{
	topic: C.TOPIC.RPC,
	action: C.ACTIONS.REQUEST,
	transform: function( data, metaData ) {}
}]);

/**
* A logger, defaults to the STDOUT / STDERROR logger
*
* @type Logger
* @default StdOutLogger
*/
server.set( 'logger', new FileLogger() );

/**
* MessageConnectors connect deepstream to a message bus
* (e.g. AMQP, Redis, Kafka) thus allowing for clustering.
*
* See the "Connectors" section above for details
*
* @type MessageConnector
* @default NoopMessageConnector
*/
server.set( 'messageConnector', new RedisMessageConnector({
  port: 6379,
  host: 'localhost'
}));

/**
* Cache connector connect deepstream to a (distributed) cache
* (e.g. Redis, Memcached)for temporary data-storage.
*
* See the "Connectors" section above for details
*
* @type CacheConnector
* @default LocalCache
*/
server.set( 'cache', new RedisCacheConnector({
  port: 6379,
  host: 'localhost'
}));

/**
* Storage connectors connect deepstream to a database (e.g. RethinkDB, MongoDB)
* for long term data storage and querying.
*
* See the "Connectors" section above for details
*
* @type StorageConnector
* @default NoopStorageConnector
*/
server.set( 'storage', new RethinkDbConnector({
  port: 28015,
  host: 'localhost',
  splitChar: '/',
  defaultTable: 'dsTestDefault'
}));

/**
* A regular expression that determines which records won't be
* stored in the database.
*
* This is useful to improve performance for fast-updating records
* that don't need to be stored in the long-term, e.g. stock prices
*
* Any record whose name matches the specified RegExp will be read / written
* directly to cache
*
* @type RegExp
* @default null
*/
server.set( 'storageExclusion', /^dont-store\/*./ );

/**
* Number of times a client can try to authenticate with invalid credentials
* before its connection is closed.
*
* @type Number
* @default 3
*/
server.set( 'maxAuthAttempts', Infinity );

/**
* Whether the data provided for invalid auth attempts should be sent to the
* logger.
*
* @type Boolean
* @default true
*/
server.set( 'logInvalidAuthData', false );

/**
* The time (in milliseconds) that deepstream allows for RPC providers to
* respond to queries. (When deepstream is asked to execute a RPC that it doesn't
* have any cached providers for it sends out a query message, asking all
* connected instances if they can provide this RPC. This is the timeout that
* determines how long deepstream will wait for their response).
*
* This is different from rpcAckTimeout
*
* @type Number
* @default 1000
*/
server.set( 'rpcProviderQueryTimeout', 5000 );

/**
* The time (in milliseconds) that deepstream allows for RPC providers to 
* acknowledge that they've received a request.
*
* @type Number
* @default 1000
*/
server.set( 'rpcAckTimeout', 200 );

/**
* The time (in milliseconds) that deepstream allows for RPC providers to send
* a response.
*
* @type Number
* @default 10000
*/
server.set( 'rpcTimeout', 2000 );

/**
* The time (in milliseconds) that deepstream caches its list of rpcProviders.
*
* @type Number
* @default 60000
*/
server.set( 'rpcProviderCacheTime', 120000 );

/**
* The time (in milliseconds) that deepstream allows for data to be retrieved
* from the cache.
*
* @type Number
* @default 1000
*/
server.set( 'cacheRetrievalTimeout', 200 );

/**
* The time (in milliseconds) that deepstream allows for data to be retrieved
* from the database.
*
* @type Number
* @default 2000
*/
server.set( 'storageRetrievalTimeout', 4000 );

/**
* The time (in milliseconds) that deepstream allows for dependencies
* (Cache Connector, Logger etc.) to complete their initialization.
*
* @type Number
* @default 2000
*/
server.set( 'storageRetrievalTimeout', 4000 );
```

</div>
