{
	"title": "Searching and Querying",
	"description": "Learn how to add search functionality to deepstream"
}
Searching & Querying
====================================

Deepstream doesn’t come with build-in search capabilities, but makes it easy to store and query records in a database

### Storage Connector
Deepstream uses a “storage connector” to connect to a database and write records to it. You can read more about the concept in the [connectors and deployment page](connectors-and-deployment.html) , browse a list of ready-to-use connectors on the [download page](../download/) or read a [tutorial on how to write your own](writing-storage-cache-connector.html).


### Using deepstream's RethinkDB realtime search provider
At the time of writing (June 2015), [RethinkDB](http://rethinkdb.com/) is the only database that natively supports realtime queries. (If you know of another one, [please give us a nudge](mailto:info@hoxton-one.com)). Using it, we've build a provider that creates dynamically updating lists based on search criteria.

<a class="mega" href="https://github.com/hoxton-one/deepstream.io-provider-search-rethinkdb"><i class="fa fa-github"></i>deepstream.io-provider-search-rethinkdb</a>

How does it work? Given you have a number of records like

	ds.record.getRecord( 'book/i95ny80q-2bph9txxqxg' ).set({
	    'title': 'Harry Potter and the goblet of fire',
	    'price': 9.99
	});

and use deepstream.io's RethinkDb storage connector with a splitChar

	{ splitChar: '/' }

you can search for Harry Potter books that cost less than 15.30 by creating a dynamic list name, e.g.

	var queryString = JSON.stringify({
	    table: 'book',
	    query: [
	        [ 'title', 'match', '^Harry Potter.*' ],
	        [ 'price', 'lt', 15.30 ]
	    ]
	});

	//search?{"table":"book","query":[["title","match","^Harry Potter.*"],["price","lt",15.3]]}
	ds.record.getList( 'search?' + queryString );

### Alternatively, here are a few things to consider when building your own search

***splitChar / tables***
Most databases have a concept of a table or a collection. And most storage-providers support a `splitChar`, a character that is used in recordnames to seperate the record's id from the table that it should be stored in, e.g.

	// a mongo-db storage-connector with
	deepstream.set( 'storage', new MongoDbStorageConnector{
		connectionString: 'mongodb://usr:pass@localhost:10087/testdb',
		splitChar: '/'
	})

	//would store this record
	var rec = ds.record.getRecord( 'book/i95ny80q-2bph9txxqxg' );

	//in a new collection called book


***data structure***
Records are not stored their raw format, but in the following structure

	{
		_v: 1,  // version
		_o: {}, // options - coming soon
		_d: {}, // the actual data
	}


***use rpcs instead of lists***
Searches are usually a single request-response operation, so it might make more sense to build providers for them as RPC's, rather than lists.
