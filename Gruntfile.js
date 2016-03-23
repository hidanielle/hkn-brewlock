module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    config: {
      port: 8000,
      dist: 'dist',
      tmp: 'tmp'
    },
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      templates: {
        options: {
          pretty: true,
          i18n: {
            locales: 'locales/*.yml',
            localeExtension: true
          },
        },
        files: {
          "<%= config.dist %>/index.html": ["jade/index.jade"]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/js/app.min.js': ['js/app.js']
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= config.tmp %>/app.css': 'scss/app.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          '> 1%',
          'last 2 versions',
          'Firefox ESR',
          'Opera 12.1',
          'ie 9',
          'Safari 6'
        ],
        map: true
      },
      dist: {
        src: '<%= config.tmp %>/app.css',
        dest: '<%= config.dist %>/css/app.css'
      }
    },

    connect: {
      options: {
        port: '<%= config.port %>',
        open: true,
        hostname: 'localhost',
        base: '<%= config.dist %>'
      },
      server: {
        options: {
          livereload: true,
          base: ['<%= config.dist %>']
        }
      }
    },

    clean: {
      all: ['<%= config.dist %>', '<%= config.tmp %>']
    },

    copy: {
      etc: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.build %>',
            dest: '<%= config.dist %>',
            src: [
              'images/**',
              'js/jquery.stellar.min.js',
              'js/jquery.fittext.js',
              '*.ico'
              ]
          }
        ]
      }
    },

    watch: {
      options: { livereload: true },
      jade: {
        files: ['jade/*.jade', 'locales/*.yml'],
        tasks: ['jade']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['uglify']
      },
      img: {
        files: ['images/**'],
        tasks: ['copy']
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-jade-i18n');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'css', 'jade', 'uglify']);

  // All CSS
  grunt.registerTask( 'css', [ 'sass', 'autoprefixer' ] );

  // Serve presentation locally
  grunt.registerTask( 'serve', [ 'default', 'copy', 'connect', 'watch' ] );
 

}