var fs = require( 'fs' );
var path = require( 'path' );
var async = require( 'async' );
var parse = require( 'csv-parse' );
var walk = require( 'walk' );

var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();

var loadedSpec = {
	specs: {},
	features: {},
};

function readMessageStructures( next ) {
	var specs = loadedSpec.specs;
	var content = fs.readFileSync( 'data/specs.csv' ).toString('utf8');
	parse(content, { 
		columns: true,
		skip_empty_lines: true,
		trim: true
	}, function( err, output ) {
		output.forEach( function( entry ) {
			if( !specs[ entry.type ] ) {
				specs[ entry.type ] = {
					name: entry.type,
					structures: []
				};	
			} 
			entry.id = entry.type + '-' + entry.id;
			specs[ entry.type ].structures.push( entry );
		} )
		walkFeatureTree( next );
	});
}

var walkFeatureTree = function( next ) {
	var inputDir =  path.join( __dirname, '../../deepstream.io-client-specs/features' );
	var walker = walk.walk( inputDir, {} );
	walker.on( 'file', readMessageScenarios );
	walker.on( 'end', function() {
		next();
	} );
};

function readMessageScenarios( root, stats, next ) {
	var features = loadedSpec.features;
	if( stats.name.indexOf( '.feature' ) > -1 ) {
		var content = fs.readFileSync( path.join( root, stats.name ) ).toString('utf8');
		feature = parser.parse( content );
		if( feature.tags.length === 0 ) {
			console.log( 'Please add a tag to the feature', feature.name );
		} else {
			var tag = feature.tags[ 0 ].name.substr( 1 );
			if( !features[ tag ] ) {
				features[ tag ] = [];
			}
			features[ tag ].push( {
				content: content,
				feature: feature
			} );
		}
	}
	next();
}

exports.action = readMessageStructures;
exports.loadedSpec = loadedSpec;