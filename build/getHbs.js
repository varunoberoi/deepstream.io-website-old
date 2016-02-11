var fs = require( 'fs' );
var hbs = require( 'handlebars' );
var path = require( 'path' );


hbs.registerHelper( 'link', function( type, target ) {
	var url, folder;

	target = hbs.compile( target )( this );

	if( type === 'page' ) {
		folder = module.exports.outputDir;
	}
	else if( type === 'asset' ) {
		folder = module.exports.outputDir + '/assets';
	}
	else if( type === 'blogpost' ) {
		folder = module.exports.outputDir + '/blog/' + target;
		var relativePath = path.relative( module.exports.cwd, folder );
		return  relativePath ? relativePath.replace( /\\/g, '/')  + '/' : '';
	} else {
		throw new Error( 'Link type not supported: ' + type );
	}

	url = path.relative( module.exports.cwd, folder );

	return path.join( url, target ).replace( /\\/g, '/');
});

hbs.registerHelper( 'capitalizeFirstLetter', function( string ){
    return string.charAt(0).toUpperCase() + string.slice(1);
});

hbs.registerHelper( 'issue', function( number ){
	var html = '<a class="githubIssue"'+
			' href="https://github.com/deepstreamIO/deepstream.io/issues/'+
			number +'">#'+ number +'</a>';

	return new hbs.SafeString( html );
});

hbs.registerHelper( 'githubstar', function( number ){
	var html = '<a class="github-button" href="https://github.com/deepstreamIO/deepstream.io" ' + 
	'data-icon="octicon-star" data-style="mega" data-count-href="/deepstreamIO/deepstream.io/stargazers" ' +
	'data-count-api="/repos/deepstreamIO/deepstream.io#stargazers_count" ' + 
	'data-count-aria-label="# stargazers on GitHub" ' + 
	'aria-label="Star deepstreamIO/deepstream.io on GitHub">Star</a>';
	return new hbs.SafeString( html );
});

hbs.registerHelper( 'downloadItem', function( name, packageName, hasBower, icon ){
	var html = '' +
		'<li class="download-item ' + packageName.replace( '.', '_') + '" data-package="' + packageName + '">';

		if( icon ) {
			html += '<i class="fa fa-' + icon + '"></i>';
		}

		html +=	'<h3 class="download-item-header">' + name + '</h3>' +
			'<code>' +
				'<span class="pckg-name">' + packageName + '</span><span class="version">-</span>' +
			'</code>' +
			'<a class="npm download-link" title="get from npm" href="https://www.npmjs.com/package/' + packageName + '"><i></i><span>NPM</span></a>';
		if( hasBower === true ) {
			html += '<a class="bower download-link" title="get from bower" href="//bower.io/search/?q=' + packageName + '"><i></i><span>Bower</span></a>';
		}

		html +=	'<a class="github download-link" title="see on github" href="https://github.com/deepstreamIO/' + packageName + '"><i></i><span>Github</span></a>' +
		'</li>';

	return new hbs.SafeString( html );
});


hbs.registerHelper( 'viewport', function(){
	if( this.isDocs ) {
		return '';
	} else {
		return new hbs.SafeString( '<meta name="viewport" content="width=device-width, initial-scale=1" />' );
	}
});

hbs.registerHelper( 'debug', function( context ){
	delete context.blogPosts;
	var val = JSON.stringify( context, null, '    ' );
	return new hbs.SafeString( '<pre>' + val + '</pre>' );
});

hbs.registerHelper( 'activeSpecPage', function( name, options ) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return options.data.root.pagePath.indexOf( name ) > -1 ? fnTrue( this ) : fnFalse( this );
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
