module.exports = function (grunt) {
    // tasks configuration
    grunt.initConfig({
        concat: {
            options: {
                separator: ' \n'
            },
            dist: {
                src: ['src/js/src_main.js'],
                dest: 'public/js/main.js',
                nonull: true,
                options: {
                    banner: '(function ($) {  \n\n $(document).ready(function () { \n\n',
                    footer: '}); \n\n }) \n\n(jQuery);'
                }
            },
            app: {
                src: ['src/js/src_app.js', 'src/js/app/*/*.js', 'src/js/app/**/*.js'],
                dest: 'public/js/app.js',
                nonull: true
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
                    config: 'config.rb',
                    environment: 'development'
                }
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'public/main.js': ['public/**/*.js']
                }
            }
        },

        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    cwd: "views",
                    src: "**/*.build.jade",
                    dest: "build",
                    expand: true,
                    ext: ".html"
                }]
            }
        },

        watch: {
            css: {
                files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
                tasks: ['compass']
            },
            scripts: {
                files: ['src/js/*.js', 'src/js/**/*.js'],
                tasks: ['concat']
            },
            jade: {
                files: '**/*.jade',
                tasks: ['jade']
            }
        }
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // define the tasks
    grunt.registerTask('stylesheets', 'Compiles the stylesheets.', ['compass']);
    grunt.registerTask('scripts', 'Compiles the JavaScript files.', ['uglify', 'concat']);
    grunt.registerTask('build', 'Compiles all stylesheets and scripts.', ['jade', 'compass']);
    grunt.registerTask('default', 'Watch the project for any changes.', ['build', 'watch']);
};