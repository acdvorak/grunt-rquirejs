/*
 * grunt-rquire
 * https://github.com/acdvorak/grunt-rquirejs
 *
 * Copyright (c) 2014 Andrew C. Dvorak
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');

var rquire = require('../../rquirejs');

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
        config.globals = _.extend({ '$': 'jQuery' }, config.globals);

        var done = this.async();

        rquire.compile(config, done);
    });

    grunt.registerMultiTask('rquire-example', 'Micro RequireJS-like build system for modular JavaScript libraries.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
