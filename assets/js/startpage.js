(function(){
	'use strict';

	var $win, $header;
	var h = $('#segment-header').height() - 80;
	$win = $(window);
	$header = $('#header');
	$win.on('scroll', function() {
		if ($win.scrollTop() > h) {
			$header.addClass('navbar-fixed-top');
		} else {
			$header.removeClass('navbar-fixed-top');
		}
	});

})();