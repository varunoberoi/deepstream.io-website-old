( function( $ ) {

	function formatSpecMessage( message ) {
		var parts = message.split( '|' );
		var html = "";
		var	messageClass = "";
		messageClass += parts[ 1 ] !== 'A' ? '' : ' ack-message-format';
		messageClass += parts[ 1 ] !== 'E' ? '' : ' error-message-format';

		for( var i=0; i<parts.length; i++ ) {
			html+= '<span class="message-format-part-' + i + '">' + parts[ i ] + '</span>';
			if( i<parts.length-1) {
				html += '<span class="message-format-pipe">|</span>';
			}	
		}
		html = html.replace( '+', '' );
		html += '<span class="message-format-end">+</span>';
		return {
			class: messageClass,
			content: html
		}
	}

	Prism.hooks.add('wrap', function(env) {
		if (env.type === 'msgSpec' && env.content.indexOf( '<' ) === -1 ) {
			var messageSpec = formatSpecMessage( env.content );
			env.content = messageSpec.content;
			env.classes.push( messageSpec.class )
		}
	});

	$( document ).ready(function() {

		$( 'code' ).on( 'mouseenter', '.message-format', function( e ) {
			var destination = $( e.target ).parent( '.message-format' ).offset();

			$( '.message-in-depth' )
				.css({top: destination.top - 133, left: destination.left - 100 })
				.show();
		} );

		$( 'code' ).on( 'mouseleave', '.message-format', function( e ) {
			$( '.message-in-depth' )
				.hide();
		} );
	});

} )( jQuery );