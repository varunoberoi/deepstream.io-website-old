{
	"title": "Lists tutorial",
	"description": "learn how to use deepstream's list feature to manage collections of records"
}
Lists
==============================
[Lists](../docs/list.html) provide a way to manage a group of [Records](../docs/record.html). A list is an array of record names
that can be manipulated and observed.

	//creating or retrieving a list is the same
	var pupils = ds.record.getList( 'pupils' );

	//You can set the entire list's records
	var johnDoe = ds.record.getRecord( 'johnDoe' );
	var janeDoe = ds.record.getRecord( 'janeDoe' );
	pupils.setEntries( ['johnDoe', 'janeDoe'] );

	//And you can add an entry to a list
	var jimDoe = ds.record.getRecord( 'jimDoe' );
	pupils.addEntry( 'jimDoe' );

	//You can likewise remove entries from a list
	pupils.removeEntry( 'jimDoe' );

	//And you can remove all entries by reinitialising
	//the list
	pupils.setEntries( [] );

	//Getting the list of records is simple
	pupils.getEntries(); //['johnDoe', 'janeDoe'];

	//But be aware, if your record exists already
	//it needs a brief moment to receive its data
	pupils.whenReady( function(){
		console.log( 'Pupils', pupils.getEntries() );
	});

	//So a typical workflow to print all the data
	//from a list would be as follows
	pupils.whenReady( function onListReady() {
		pupils.getEntries().forEach( function( id ) {
			var pupil = ds.record.getRecord( id );
			pupil.whenReady( function(){
				console.log( pupil.get() );
			});
		})
	});

	//The subscribe feature can be used to be updated
	//whenever the list changes
	var onPupilChange = function( pupils ) {
		console.log( 'List of pupils is now', pupils.getEntries() );
	};

	pupils.subscribe( onPupilChange );

	//You can remove subscriptions by unsubscribing, but please be aware 
	//that this only unsubscribes locally, updates will continue to be sent from the server
	pupils.unsubscribe( onPupilChange );

	//Once you are no longer interested in receiving
	//updates for this list, call discard, which will
	//stop the server from sending any updates
	pupils.discard();

	//Or delete the list entirely
	pupils.delete();
