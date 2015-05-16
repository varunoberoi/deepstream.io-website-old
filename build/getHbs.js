var hbs = require( 'handlebars' );
var path = require( 'path' );


hbs.registerHelper( 'link', function( type, target ) {
	var url, folder;

	if( type === 'page' ) {
		folder = module.exports.outputDir;
	}

	if( type === 'asset' ) {
		folder = module.exports.outputDir + '\\assets';
	}

	url = path.relative( module.exports.cwd, folder );

	return path.join( url, target ).replace( /\\/g, '/');
});

hbs.registerHelper( 'issue', function( number ){
	var html = '<a class="githubIssue"'+
			' href="https://github.com/hoxton-one/golden-layout/issues/'+ 
			number +'">#'+ number +'</a>';

	return new hbs.SafeString( html );
});

hbs.registerHelper( 'downloadItem', function( name, packageName, hasBower ){
	var html = '' +
		'<li class="download-item" data-package="' + packageName + '">' +
			'<h3>' + name + '</h3>' +
			'<span class="pckg-name">' + packageName + '</span>' +
			'<div class="img-container">' +
				'<img src="http://placehold.it/180x180" width="180" height="180" />' +
				'<span class="version">0.2.6</span>' +
			'</div>' +
			'<a class="npm" title="get from npm" href="https://www.npmjs.com/package/' + packageName + '"></a>';
		if( hasBower === true ) {
			html += '<a class="bower" title="get from bower" href="http://bower.io/search/?q=' + packageName + '"></a>';
		}
			
		html +=	'<a class="github" title="see on github" href="https://github.com/hoxton-one/' + packageName + '"></a>' +
		'</li>';

	return new hbs.SafeString( html );
});

module.exports = hbs;

module.exports.cwd = null;