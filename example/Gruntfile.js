module.exports = function(grunt) {

    // Actually load this plugin's task(s).
    grunt.loadTasks('../tasks');

    grunt.initConfig({
        rquire: {
            build: {
                options: {
                    globals: {
                        '_': '_'
                    },
                    src_root: '/Users/acdvorak/dev/libs/D.js/src',
                    main: 'D.js',
                    dest: '/Users/acdvorak/dev/libs/D.js/dist/D.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['rquire']);
};
