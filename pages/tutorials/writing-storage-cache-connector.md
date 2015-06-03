Writing storage and cache connectors
========================================

***Cache connectors*** are classes that connect deepstream to an in-memory cache, e.g. Redis, Memcached,
IronCache or Amazon's elastic cache

***Storage connectors*** are classes that connect deepstream to a database, e.g. MongoDB, CouchDB, Cassandra or
Amazon's DynamoDB. They can also be used with relational databases, but deepstream's data-structures (blocks
of JSON, identified by a key) lends itself very well to object/document based databases.

<div class="hint-box fa fa-gears">
	<p>Before writing your own storage or cache connector, have a quick look at the <a href="../downloads/">download section</a>. Maybe there already is an off-the-shelf one you can just pick up or use. <em>If you're happy with how you're connector turned out, please consider contributing it. To do so, just <a href="https://github.com/hoxton-one/deepstream.io/issues">raise an issue against deepstream.io</a></em></p></div>

To write a storage or cache connector, just clone or fork the cache-and-storage-connector-template below and fill in the blanks. To see if it works, update the `settings` variable on line 4 of the <a href="https://github.com/hoxton-one/deepstream.io-cache-and-storage-connector-template/blob/master/test/cache-connectorSpec.js">test file</a> and run the tests with `npm test`. Please note: The tests are very high level and only test the basic functionality. It might make sense to add additional tests that are specific for your connector.

<a class="mega" href="https://github.com/hoxton-one/deepstream.io-cache-and-storage-connector-template"><i class="fa fa-github"></i>fork or copy the cache-and-storage-connector-template</a>

Both cache and storage connectors expose the same interface and offer similar functionality,
yet their role is a little bit different.

Deepstream servers don't hold any data themselves. This allows the individual servers to remain
stateless and to go down / fail over without causing any data-loss, but it also allows for
the data to be distributed across multiple nodes.

Whenever deepstream has to store something, its written to the cache in a blocking fashion, but written to
storage in a non blocking way. (Well, its NodeJS, so it's not really 'blocking', but the next callback for
this particular update won't be processed until the cache operation is complete)

Similarly, whenever an entry needs to be retrieved, deepstream looks for it in the cache first and in storage
second. This means that the cache needs to be fast - very fast - and fortunately most caches are. Both Redis and Memcached
have proven to be able to return queries within the same millisecond.

So why have this distinction between cache and storage at all? Because they complement each other quite well:

- Caches need to make a relatively small amount of data accessible at very high speeds. They achieve that by storing
  the data in memory, rather than on disk (although some, e.g. Redis, write to disk as well). This means that
  all data is lost when the process exists. Caches also usually don't offer support for elaborate querying.

- Databases (storage) offer long-term storage of larger amounts of data and allow for more elaborate ways of querying.
  (full-text search, SQL etc.)

<div class="hint-box fa fa-lightbulb-o">

	<h3>Some considerations when implementing a cache/storage connector</h3>
	<ul>
		<li>
		The <code>isReady</code> property starts as <code>false</code>. Once the connection to the cache / database is established, emit a <code>'ready'</code> event and set <code>isReady</code> to <code>true</code>.
		</li>
		<li>
		Whenever a generic error occurs (e.g. an error that's not directly related to a get, set or delete operation, raise an error event and send the error message as a parameter, e.g. this.emit( 'error', 'connection lost' );
  		</li>
  		<li>
			whenever an error occurs as part of a get, set or delete operation, pass it to the callback as the first argument, otherwise pass null
  		</li>
  		<li>
		values for <code>set()</code> will be serializable JavaScript objects and are expected to be returned by <code>get()</code> as such. It's
  therefor up to this class to handle serialisation / de-serialisation, e.g. as JSON or message-pack. Some systems (e.g. MongoDB) however can also handle raw JSON directly
  		</li>
  	</ul>
</div>
