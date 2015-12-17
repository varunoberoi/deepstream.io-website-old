{
	"title": "Connectors and Deployment tutorial",
	"description": "learn how deepstream connects to caches, databases and messaging systems"
}
Connectors and Deployment
===============================

Deepstream can connect to three different systems: A (distributed) cache, a database and a messaging system. There are a number of [pre-build connectors](../download/) that make integration easy, but it's also straight forward to write your own [message](writing-messaging-connector.html) or [storage and cache connector](writing-storage-cache-connector.html).

Connectors can be used using deepstream's `set()` method.

	var RedisCacheConnector = require( 'deepstream.io-cache-redis' ),
		AmqpMessageConnector = require( 'deepstream.io-msg-amqp' ),
		RethinkDbConnector = require( 'deepstream.io-storage-rethinkdb' ),
		Deepstream = require( 'deepstream.io' );

	var server = new Deepstream();

	server.set( 'cache', new RedisCacheConnector({
		port: 6379,
		host: 'localhost' 
	}));

	server.set( 'messageConnector', new AmqpMessageConnector({
		port: 5672,
		host: 'localhost' 
	}));

	server.set( 'storage', new RethinkDbConnector({
		port: 28015,
		host: 'localhost',
		splitChar: '/',
		defaultTable: 'ds-records'
	}));

	server.start();


### Cache
In production, deepstream instances don’t hold any data. Instead they connect to an external, distributed cache (e.g. Redis or Memcached). This makes them stateless, quick to spin up and allows for clustering.

### Storage
In addition to a cache, deepstream can store records in a database. This happens outside the performance critical path and has two benefits: It provides a way to store data persistently when used in conjunction with an in-memory only cache (e.g. Memcached) and it allows to utilise the database’s query features to run complex searches against the data. Due to the way deepstream structures its data (JSON blobs, identified by a primary key) it is recommendable to use an Object oriented or schema-less database (e.g. MongoDB or RethinkDB), rather than a relational database like MySQL.

### Messaging
deepstream instances can share updates with each other via a message-bus. This enables horizontal scalability and allows to cater for a large number of clients at the same time. Small clusters (e.g. 3-4 instances) can connect directly to each other via TCP using the [direct connector](../download/) whereas it makes sense for larger clusters to use a message broker or Pub-Sub system instead (e.g. AMQP, Redis or Apache Kafka.)

### Performance
The most performance-critical path of deepstream’s architecture is the connection between it and its cache and messaging system. Both are constantly in use and any millisecond in network latency can lead to a noticeable decline in performance. It’s therefore recommendable to host deepstream and its cache and messaging system in close network proximity, e.g. within the same data centre, server or aws-region.

### What’s the simplest production-ready setup?
Good question, simple answer: Redis and 2-3 deepstream instances. Redis provides a fast cache, persists its data to disk and offers a pub-sub mechanism that can be used for messaging. The whole setup would look like this:


	var RedisCacheConnector = require( 'deepstream.io-cache-redis' ),
		RedisMessageConnector = require( 'deepstream.io-msg-redis' ),
		Deepstream = require( 'deepstream.io' );

	var server = new Deepstream();

	server.set( 'cache', new RedisCacheConnector({
		port: 6379,
		host: 'localhost' 
	}));

	server.set( 'messageConnector', new RedisMessageConnector({
		port: 6379,
		host: 'localhost' 
	}));

	server.start();