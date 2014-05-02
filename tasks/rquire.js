/*
 * grunt-rquire
 * https://github.com/acdvorak/grunt-rquirejs
 *
 * Copyright (c) 2014 Andrew C. Dvorak
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore')
  , path = require('path')
  , glob = require('glob')
  , rquire = require('rquirejs')
;


module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('rquire', 'Micro RequireJS-like build system for modular JavaScript libraries.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var config = this.options({
            "src_root": "src/",
            "main": "main.js",
            "modules_dir": "modules/",
            "safe_undefined": false,
            "dest": ""
        });

        var userModules = grunt.option('modules');

        config.user_modules = userModules ? userModules.split(/[,\s:;]+/g) : [];
        config.aliases = _.extend({}, config.aliases);
        config.globals = _.extend({}, config.globals);

        if (config.user_modules[0] === 'all') {
            config.user_modules = glob.sync('**/*.js', {
                cwd: path.resolve(config.src_root, config.modules_dir)
            });
        }

        var done = this.async();

        rquire.compile(config, function() {
            // Print a success message.
            grunt.log.writeln('File "' + config.dest + '" created.');

            done();
        });
    });

};
