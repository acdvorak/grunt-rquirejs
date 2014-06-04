/*
 * grunt-rquire
 * https://github.com/acdvorak/grunt-rquirejs
 *
 * Copyright (c) 2014 Andrew C. Dvorak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        rquire: {
            default_options: {
                options: {
                },
                files: {
                    'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            },
            custom_options: {
                options: {
                    separator: ': ',
                    punctuation: ' !!!'
                },
                files: {
                    'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            },
            'D.js': {
                options: {
                    globals: {
                        '_': '_'
                    },
                    aliases: {
                        // All three path styles below are equivalent
//                        'underscore': 'libs/underscore',
//                        'overload': 'libs/overload.js',
//                        'signal': '/libs/signal.js'
                    },
                    src_root: '/Users/acdvorak/dev/libs/D.js/src',
                    main: 'D.js',
                    dest: '/Users/acdvorak/dev/libs/D.js/dist/D.js',
                    safe_undefined: true,
                    micro_paths: true,
                    universal: 'D'
                }
            },
            'example': {
                options: {
                    // Global variable mappings to expose to your library.
                    // While this is technically optional, it is a good practice to be explicit
                    // about the global dependencies your library expects.
                    //
                    // Key   = the variable name that will be seen and used by your library internally
                    // Value = the actual name of the variable in the global scope
                    globals: {
                        'root': 'window',
                        'window': 'window',
                        'document': 'document',
                        '_': '_',
                        '$': 'window.Zepto || window.jQuery'
                    },

                    // Transforms require('alias-name') into require('/full/path/to/file.js') in the output.
                    aliases: {
                        'some-lib': '/long/path/to/some/lib.js',
                        '/fake/path.js': '/real/path.js'
                    },

                    // All other paths are relative to this directory (EXCEPT `dest`!).
                    // `src_root` itself is relative to the current working directory
                    // of the Node process.
                    src_root: 'src/',

                    // The main entry point for your library.
                    main: 'main.js',

                    // Base directory containing user-selectable modules.
                    modules_dir: 'modules/',

                    // Path to the output JS file relative to the current working directory
                    // of the Node process.
                    dest: 'dist/my.js',

                    // TODO: Document me
                    safe_undefined: true,

                    // TODO: Document me
                    micro_paths: true,

                    // TODO: Document me
                    universal: 'myGlobalPropertyNameForWebBrowsers'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'rquire', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
