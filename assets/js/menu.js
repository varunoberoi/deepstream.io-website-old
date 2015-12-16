( function( $ ) {

	$( document ).ready(function() {
		var menuOpen = false;

		$( '.menu-button' ).click( function() {
			menuOpen = !menuOpen;
			$( 'body' ).toggleClass( 'menu-open', menuOpen );
		} );
	});

} )( jQuery );