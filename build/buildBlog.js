var moment = require( 'moment' );
var walk = require( 'walk' );
var path = require( 'path' );
var async = require( 'async' );
var fse = require( 'fs-extra' );
var hbs = require( './getHbs.js' );
var fileOptions = { encoding: 'utf8' };

var authors = require( '../authors.json' );

var inputDir =  path.join( __dirname, '../pages/blog' );
var outputDir = path.join( __dirname, '../htdocs/blog' );

var mainTemplate = null;
var targetFileExtension = '.html';
var fileBuilder = {
	'hbs': require( './fileBuilder/HbsBuilder' ),
	'md': require( './fileBuilder/MdBuilder' )
};
var blogPosts = [];

exports.action = function( done ) {
	async.waterfall([
	//	createTargetDirectory,
		readTemplate,
		walkTree,
		sortBlogs,
		writeBlogs,
		writeBlogIndex
	], done );
};

var readTemplate = function( next ) {
	var templatePath = path.join( __dirname, '../index.hbs' );
	
	fse.readFile( templatePath, fileOptions, function( error, contents ){
		mainTemplate = hbs.compile( contents );
		next( error );
	});
};

var walkTree = function( done ) {
	var walker = walk.walk( inputDir, {} );
	walker.on( 'directory', createTargetDirectory );
	walker.on( 'file', createTargetFile );
	walker.on( 'end', done );
};

var createTargetDirectory = function( root, stats, next ) {
	var targetDir = path.join( outputDir, stats.name );
	fse.mkdir( targetDir, next );
};

var createTargetFile = function( root, stats, next ) {
	var srcFilePath = path.join( root, stats.name ),
		fileExtension = path.extname( stats.name ).replace( '.', '' ),
		targetFileName = stats.name.replace( '.' + fileExtension, targetFileExtension ),
		page = stats.name.replace( '.' + fileExtension, '' ),
		targetFilePath = path.join( root.replace( inputDir, outputDir ), targetFileName ),
		folder;

	if( stats.name.indexOf( 'index.hbs' ) > -1 ) {
		next();
		return;
	}

	if( stats.name.indexOf( '.md' ) === -1 ) {
		fse.copy( srcFilePath, root.replace( inputDir, outputDir ) + '/' + stats.name, function( err ) {
			if (err) {
				console.log( err );
				throw err;
			}
			next();
		} );
		return;
	}

	if( root === inputDir ) {
		folder = '';
	} else {
		folder = root.replace( inputDir + '\\', '' );
	}

	var contextVars = {
		versions: CONFIG.versions,
		latest: CONFIG.latest,
		isDef: CONFIG.isDevelopment,
		isNotStart: folder.length > 0,
		category: folder,
		isDocs: false,
		isBlogEntry: true,
		pageIs_blog: true
	};

	var data = {
		srcFilePath: srcFilePath,
		targetFilePath: targetFilePath,
		outputDir: outputDir,
		contextVars: contextVars
	};

	async.waterfall([
		readFile.bind( {}, srcFilePath ),
		buildBlogPost.bind( {}, data )
	], next );
};

var readFile = function( srcFilePath, next ) {
	fse.readFile( srcFilePath, fileOptions, next );
};

var buildBlogPost = function( data, fileContent, next ) {
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

	fileContent = fileContent.substr( metaDataEnd + 1 ).trim();

	if( metaData.isDraft ) {
		next();
		return;
	}
	
	if( !metaData.title || !metaData.dateISO || !metaData.author || !metaData.thumbnail ) {
		throw new Error( 'Missing meta data for blog entry (title|dateISO|author|thumbnail) ' + data.targetFilePath );
	}

	if( !authors[ metaData.author] ) {
		throw new Error( 'Author needs to be declared in author.json file ' + metaData.author );	
	}

	fileBuilder.md.build( fileContent, data, function( error, innerHtml ) {

		pageContent = new hbs.SafeString( innerHtml );
		
		if( !innerHtml.match( '<p>([^>]*)') ) {
			throw new Error( 'No excert could be extracted from blog post' );
		}

		data.contextVars.targetFilePath = data.targetFilePath;

		data.contextVars.description = innerHtml.match( '<p>([^<]*)')[ 1 ];
		data.contextVars.dateISO = metaData.dateISO;
		data.contextVars.date = moment( metaData.dateISO, 'YYYYMMDD' ).format( 'MMMM Do YYYY' );
		data.contextVars.shortDate = moment( metaData.dateISO, 'YYYYMMDD' ).format( 'DD/MM/YYYY' );
		data.contextVars.title = metaData.title;
		data.contextVars.author =  authors[ metaData.author];
		data.contextVars.blogPath =  data.contextVars.category + '/';
		data.contextVars.thumbnail = data.contextVars.blogPath + metaData.thumbnail;
		data.contextVars.pageContent = pageContent;

		blogPosts.push( data.contextVars );

		next();
	});
};

var sortBlogs = function( next ) {
	blogPosts.sort( function( blogA, blogB ) {
		return blogA.dateISO > blogB.dateISO;
	} );
	next();
	module.exports.blogPosts = blogPosts;
};

var writeBlogIndex = function( next ) {
	var contextVars = {
		title: 'The deepstream blog',
		description: 'Covering every aspect of deepstream in your day to day life',
		versions: CONFIG.versions,
		latest: CONFIG.latest,
		isDef: CONFIG.isDevelopment,
		isNotStart: true,
		isDocs: false,
		pageIs_blog: true,
		blogPosts: blogPosts
	};

	var data = {
		srcFilePath: inputDir + '/index.hbs',
		targetFilePath: outputDir + '/index.html',
		outputDir: outputDir,
		contextVars: contextVars
	};

	hbs.cwd = path.dirname( data.targetFilePath );
	hbs.outputDir = path.join( __dirname, '../htdocs' );

	var fileContent = fse.readFileSync(data.srcFilePath, fileOptions );
	fileBuilder.hbs.build( fileContent, data, function( error, innerHtml ) {
		data.contextVars.pageContent = new hbs.SafeString( innerHtml );
		fse.writeFileSync( data.targetFilePath, mainTemplate( data.contextVars ) );
		next();
	});
};

var writeBlogs = function( next ) {
	async.each( blogPosts, function iterator(contextVars, callback) {
		contextVars.blogPosts = blogPosts;

		hbs.cwd = path.dirname( contextVars.targetFilePath );
		hbs.outputDir = path.join( __dirname, '../htdocs' );

		fse.writeFileSync( contextVars.targetFilePath, mainTemplate( contextVars ), fileOptions );
		callback();
	}, next );
};