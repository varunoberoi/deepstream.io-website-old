(function(){
	var packages = [],
		versionElements = {};

	$( '.download-item' ).each(function(){
		var element = $( this ),
			versionElement = element.find( '.version' ),
			pckg = element.data( 'package' );
			
		packages.push( pckg );
		versionElements[ pckg ] = versionElement;
		versionElement.addClass( 'loading' );
	});

	$.post( '/versions' , { packets: packages }, function( result ){ 
	    result = JSON.parse( result );

	    for( var pckg in versionElements ) {
	    	versionElements[ pckg ].html( result[ pckg ] );
	    	versionElements[ pckg ].removeClass( 'loading' );
	    }
	});
})();