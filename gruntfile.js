module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');
    var banner = '';

    grunt.initConfig({
        pkg: pkg,

        staticinline: {
            main: {
                options: {
                    prefix: '@{',
                    suffix: '}@',
                    vars: {
                        'hoge': 'hoge',
                    }
                },
                files: {
                    'release/alpha/index.html': 'index.html',
                },
            },
        },

        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                },
                files: {
                    'release/alpha/index.html': 'release/alpha/index.html',
                }
            }
        }
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['staticinline', 'htmlmin']);

};


