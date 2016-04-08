(function(){
	var packages = [],
		versionElements = {};

	$( '.download-item' ).has( '.npm' ).each(function(){
		var element = $( this ),
			versionElement = element.find( '.version' ),
			pckg = element.data( 'package' );
			
		packages.push( pckg );
		versionElements[ pckg ] = versionElement;
		versionElement.addClass( 'loading' );
	});

	// Use absolute path incase your looking at it from github pages
	$.post( '//deepstream.io/versions' , { packets: packages }, function( result ){ 
	    result = JSON.parse( result );

	    for( var pckg in versionElements ) {
	    	versionElements[ pckg ].html( result[ pckg ] );
	    	versionElements[ pckg ].removeClass( 'loading' );
	    }
	});
})();