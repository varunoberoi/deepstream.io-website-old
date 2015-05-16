$( '.download-item' ).each(function(){
	var element = $( this ),
		versionElement = element.find( '.version' ),
		pckg = element.data( 'package' ),
		url = 'https://api.github.com/repos/hoxton-one/' + pckg + '/releases/latest';

	versionElement.addClass( 'loading' );

	$.getJSON( url, function( data ){
		versionElement
			.removeClass( 'loading' )
			.html( data.tag_name );
	});
});