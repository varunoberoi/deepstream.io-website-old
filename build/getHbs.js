var fs = require( 'fs' );
var hbs = require( 'handlebars' );
var path = require( 'path' );


hbs.registerHelper( 'link', function( type, target ) {

	var url, folder;

	if( type === 'page' ) {
		folder = module.exports.outputDir;
	}
	else if( type === 'asset' ) {
		folder = module.exports.outputDir + '\\assets';
	}
	else if( type === 'blogpost' ) {
		folder = module.exports.outputDir + '\\blog\\' + target;
		return path.relative( module.exports.cwd, folder );
	} else {
		throw new Error( 'Link type not supported: ' + type );
	}

	url = path.relative( module.exports.cwd, folder );

	return path.join( url, target ).replace( /\\/g, '/');
});

hbs.registerHelper( 'issue', function( number ){
	var html = '<a class="githubIssue"'+
			' href="https://github.com/hoxton-one/deepstream.io/issues/'+
			number +'">#'+ number +'</a>';

	return new hbs.SafeString( html );
});

hbs.registerHelper( 'downloadItem', function( name, packageName, hasBower, icon ){
	var html = '' +
		'<li class="download-item ' + packageName.replace( '.', '_') + '" data-package="' + packageName + '">';

		if( icon ) {
			html += '<i class="fa fa-' + icon + '"></i>';
		}

		html +=	'<h3>' + name + '</h3>' +
			'<code>' +
				'<span class="pckg-name">' + packageName + '</span>: <span class="version">-</span>' +
			'</code>' +
			'<a class="npm label" title="get from npm" href="https://www.npmjs.com/package/' + packageName + '"><i></i><span>NPM</span></a>';
		if( hasBower === true ) {
			html += '<a class="bower label" title="get from bower" href="http://bower.io/search/?q=' + packageName + '"><i></i><span>Bower</span></a>';
		}

		html +=	'<a class="github label" title="see on github" href="https://github.com/hoxton-one/' + packageName + '"><i></i><span>Github</span></a>' +
		'</li>';

	return new hbs.SafeString( html );
});

hbs.registerHelper( 'debug', function(){
	var val = JSON.stringify( this, null, '    ' );
	return new hbs.SafeString( '<pre>' + val + '</pre>' );
});

/**
*	Load Partials
***/
fs.readdir( 'partials', function( err,files ){
	if(err) throw err;

	files.forEach(function(file){
		var templateName = file.split('.').shift();
		var partialContents = fs.readFileSync( 'partials/' + file ).toString('utf8');
		hbs.registerPartial( templateName, partialContents );
	});
});

module.exports = hbs;

module.exports.cwd = null;
