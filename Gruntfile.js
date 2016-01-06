var async = require( 'async' );

module.exports = function(grunt) {

	CONFIG = require( './config.js' );
	var versions;
	var versionPath = './htdocs/files/v' + grunt.option( 'tag' );

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Delete all files in the deployment directory except for the hidden .git folder
		 */
		clean: {
			deployDir:{
				options:{ force: true },
				src: [ CONFIG.deploymentDir + '/**/*', '!' + CONFIG.deploymentDir + '/.git' ]
			},

			htdocs: {
				src: [ './htdocs/*', '!./htdocs/assets', '!./htdocs/files' ]
			},

			latest: {
				src: './htdocs/files/latest'
			}
		},

		watch: {
			tasks: ['build'],
			files: [ './index.hbs', './pages/**', './partials/*', './htdocs/assets/**', './data/**' ],
			options: { livereload: 5051 },
		},

		/**
		 * Copy all assets and flattened pages
		 *
		 * @type {Object}
		 */
		copy: {
			toplevelfiles: {
				files: [
					{expand: true, src: ['**'], cwd: './toplevelfiles', dest: './htdocs/' }
				]
			},
			htdocs: {
				files: [
					{expand: true, src: ['**'], cwd: './htdocs', dest: CONFIG.deploymentDir },
				]
			},
			release: {
				files: [
					{expand: true, src: [ 'LICENSE-CC-NC-4.0.md', 'LICENSE-GPL-3.0.md' ], cwd: './htdocs/assets/license', dest: versionPath }
				]
			},
			latest:{
				files: [
					{expand: true, src: ['**'], cwd: versionPath, dest: './htdocs/files/latest' }
				]
			}
		},

		 browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './htdocs/assets/css/*.css'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './htdocs'
                }
            }
        }

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('buildPages', function() {
		async.waterfall([
			require( './build/buildSpecs' ).action,
			require( './build/buildBlog' ).action,
			require( './build/build' ).action
		] , this.async() );
	});

	grunt.registerTask('setConfig', function() {
		CONFIG.isDevelopment = false;
		CONFIG.baseUrl = '/';
		CONFIG.pagesUrl = '/';
		CONFIG.assetUrl = '/';
	});

	grunt.registerTask( 'checkVersion', function(){

		if( !grunt.option( 'tag' ) ) {
			throw new Error( 'Please specify a version, e.g. --tag=0.1.2' );
		}

		if( !grunt.option( 'tag' ).match( /[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}/ ) ) {
			throw new Error( 'Invalid tag. Please specify e.g. 1.2.3' );
		}

		for( var i = 0; i < versions.length; i++ ) {
			if( versions[ i ].tag === grunt.option( 'tag' ) ) {
				throw new Error( 'Version ' + grunt.option( 'tag' ) + ' already exists' );
			}
		}
	});

	grunt.registerTask('release', [
		'copy:release',
		'clean:latest',
		'copy:latest',
		'build'
	]);

	grunt.registerTask('build', [ 'clean:htdocs', 'buildPages' ] );
	grunt.registerTask('deploy', [ 'setConfig', 'build', 'copy:toplevelfiles', 'clean:deployDir','copy:htdocs' ]);
	grunt.registerTask('default', [ 'build', 'browserSync', 'watch' ] );
};
