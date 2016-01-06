var walk = require( 'walk' );
var rimraf = require( 'rimraf' );
var path = require( 'path' );
var async = require( 'async' );
var fs = require( 'fs' );
var fse = require( 'fs-extra' );
var hbs = require( './getHbs.js' );
var fileOptions = { encoding: 'utf8' };
var inputDir =  path.join( __dirname, '../pages' );
var outputDir = path.join( __dirname, '../htdocs' );
var mainTemplate = null;
var targetFileExtension = '.html';
var pagesWithNav = [ 'docs', 'tutorials', 'info' ];
var navPageExtension = '.md';
var navs = {};
var functionalFiles = [ 'nav.md' ];
var navFileName = 'nav.md';
var fileBuilder = {
	'hbs': require( './fileBuilder/HbsBuilder' ),
	'md': require( './fileBuilder/MdBuilder' )
};
var communityEvents = require( '../events.json' );

exports.action = function( done ) {
	async.waterfall([
		readTemplate,
		walkTree
	], done );
};

var readTemplate = function( done ) {
	var templatePath = path.join( __dirname, '../index.hbs' );
	
	fs.readFile( templatePath, fileOptions, function( error, contents ){
		mainTemplate = hbs.compile( contents );
		done( error );
	});
};

var readNav = function( folder, next ) {
	var navPath = path.join( inputDir, folder, navFileName );

	fs.readFile( navPath, fileOptions, function( error, content ){
		navs[ folder ] = hbs.compile( content );
		next( error );
	});
};

var buildNav = function( next ) {
	async.each( pagesWithNav, readNav, next );
};

var checkError = function( error ) {
	if( error ) {
		throw error;
	}
};

var walkTree = function( done ) {
	var options = {
  		filters: [ 'blog' ]
	};
	var walker = walk.walk( inputDir, options );
	walker.on( 'file', createTargetFile );
	walker.on( 'end', done );
};

var createTargetFile = function( root, stats, next ) {
	
	if( functionalFiles.indexOf( stats.name ) !== -1 ) {
		next();
		return;
	}

	var srcFilePath = path.join( root, stats.name ),
		fileExtension = path.extname( stats.name ).replace( '.', '' ),
		targetFileName = stats.name.replace( '.' + fileExtension, targetFileExtension ),
		page = stats.name.replace( '.' + fileExtension, '' ),
		targetFilePath = path.join( root.replace( inputDir, outputDir ), targetFileName ),
		folder;

	if( root === inputDir ) {
		folder = '';
	} else {
		folder = root.replace( inputDir + '\\', '' );
		folder = folder.split( '\\' )[ 0 ];
	}

	if( fileBuilder[ fileExtension ] === undefined ) {
		next( 'No fileBuilder found for ' + fileExtension );
		return;
	}

	buildNav( function() {

		var contextVars = {
			versions: CONFIG.versions,
			latest: CONFIG.latest,
			isDef: CONFIG.isDevelopment,
			isNotStart: folder.length > 0,
			category: folder,
			isDocs: pagesWithNav.indexOf( folder ) !== -1
		};

		contextVars[ 'pageIs_' + folder ] = true;
		contextVars[ 'fileIs_' + page.replace( '.', '_' ) ] = true;
		contextVars.pagePath = targetFilePath.replace( outputDir, '' );

		var data = {
			srcFilePath: srcFilePath,
			targetFilePath: targetFilePath,
			outputDir: outputDir,
			contextVars: contextVars
		};

		if( navs[ folder ] !== undefined ) {
			contextVars.hasNav = true;
			data.nav = navs[ folder ];
		}

		async.waterfall([
			readFile.bind( {}, srcFilePath ),
			buildFile.bind( {}, fileExtension, data ),
			writeFile.bind( {}, targetFilePath )
		], next );

	} );
};

/**
 * Parses a documentation page's html and extracts all h2
 *
 * @returns {Array} headlines
 */
var getSubNav = function( html ) {
	var regExp = /name="([^"]*)"/gm,
		result = [],
		matches = regExp.exec( html );

	while( matches !== null ) {
		result.push( matches[ 1 ] );
		matches = regExp.exec( html );
	}

	return result;
};

var readFile = function( srcFilePath, next ) {
	fs.readFile( srcFilePath, fileOptions, next );
};

var buildFile = function( fileExtension, data, fileContent, next ) {
	hbs.cwd = path.dirname( data.targetFilePath );
	hbs.outputDir = data.outputDir;
	// defaults
	data.contextVars.title = 'A Scalable Server for Realtime Web Apps';
	data.contextVars.description = 'A node.js realtime server, supporting data-sync, RPCs, events and WebRTC';
	
	if( fileExtension === 'md' ) {
		var metaDataEnd = fileContent.indexOf( '}' ),
			metaData;

		if( metaDataEnd === -1 ) {
			throw new Error( 'Missing meta-data section for ' + data.targetFilePath );
		}

		try{
			metaData = JSON.parse( fileContent.substr( 0, metaDataEnd + 1 ) );
		} catch( e ) {
			console.log( fileContent.substr( 0, metaDataEnd + 1 ) );
			console.log( e );
			throw new Error( 'Can\'t parse meta-data for ' + data.targetFilePath );
		}

		if( !metaData.title ) {
			throw new Error( 'Missing title for ' + data.targetFilePath );
		}

		if( !metaData.description ) {
			throw new Error( 'Missing description for ' + data.targetFilePath );
		}

		data.contextVars.title = metaData.title;
		data.contextVars.description = metaData.description;
		fileContent = fileContent.substr( metaDataEnd + 1 ).trim();
	}

	var blogPosts =  require( './buildBlog' ).blogPosts;
	if( !blogPosts ) {
		console.log( 'Blog data missing' );
	}
	data.contextVars.blogPosts = blogPosts;
	data.contextVars.communityEvents = communityEvents;

	var messageSpecs =  require( './buildSpecs' ).loadedSpec;
	if( !messageSpecs ) {
		console.log( 'Message specs missing' );
	}
	data.contextVars.messageSpecs = messageSpecs;

	fileBuilder[ fileExtension ].build( fileContent, data, function( error, innerHtml ){
		if( data.contextVars.hasNav ) {
			data.contextVars.subNav = getSubNav( innerHtml );
			data.contextVars.nav = new hbs.SafeString( data.nav( data.contextVars ) );
		}
		
		
		data.contextVars.pageContent = new hbs.SafeString( innerHtml );
		next( null, mainTemplate( data.contextVars ) );
	});
};

var writeFile = function( targetFilePath, content, next ) {
	fse.outputFile( targetFilePath, content, fileOptions, next );
};