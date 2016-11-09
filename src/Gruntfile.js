module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
console.log(grunt.file.readJSON('package.json').static_html);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * assemble
     */
    assemble: {
      site: {
        options: {
          assets: '<%= pkg.static_html %>/assets/themes/package',
          layoutdir: '<%= pkg.src.hbs %>/layouts/',
          partials: ['<%= pkg.src.hbs %>/partials/**/*.hbs'],
          data: ['<%= pkg.src.hbs %>/data/*.{json,yml}']
        },
        files: [
          {
            expand: true,
            cwd: '<%= pkg.src.hbs %>',
            src: ['**/*.hbs'],
            dest: '<%= pkg.static_html %>/',
          }
        ]
      }
    },

    /**
     * prettify html files
     */
    prettify: {
      options: {
        config: '.prettifyrc'
      },
      files: {
        expand: true,
        cwd: '<%= pkg.static_html %>/',
        ext: '.html',
        src: ['**/*.html'],
        dest: '<%= pkg.static_html %>/'
      }
    },

    /**
     * scss
     */
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          '<%= pkg.static_html %>/<%= pkg.css %>/style.css': '<%= pkg.src.scss %>/style.scss',
          '<%= pkg.static_html %>/<%= pkg.css %>/print.css': '<%= pkg.src.scss %>/print.scss'
        }
      }
    },


    /**
     * globbing
     */
    sass_globbing: {
      target: {
        options: {
          useSingleQuotes: true
        },
        files: {
          '<%= pkg.src.scss %>/generated/_base.scss': [
            '<%= pkg.src.scss %>/base/*.scss'
          ],
          '<%= pkg.src.scss %>/generated/_constants.scss': [
            '<%= pkg.src.scss %>/constants/*.scss'
          ],
          '<%= pkg.src.scss %>/generated/_layouts.scss': [
            '<%= pkg.src.scss %>/layouts/*.scss'
          ],
          '<%= pkg.src.scss %>/generated/_mixins.scss': [
            '<%= pkg.src.scss %>/mixins/*.scss'
          ],
          '<%= pkg.src.scss %>/generated/_modules.scss': [
            '<%= pkg.src.scss %>/modules/*.scss'
          ],
          '<%= pkg.src.scss %>/generated/_utils.scss': [
            '<%= pkg.src.scss %>/utils/*.scss'
          ]
        }
      }
    },


    /**
     * autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: [
          'last 2 versions',
          'ie 9',
          'safari 8'
        ]
      },
      target: {
        files: {
          '<%= pkg.static_html %>/<%= pkg.css %>/style.css': '<%= pkg.static_html %>/<%= pkg.css %>/style.css'
        }
      }
    },


    /**
     * copy
     */
    copy: {
      image: {
        expand: true,
        cwd: '<%= pkg.static_html %>/<%= pkg.img %>/',
        src: '**/*',
        dest: '<%= pkg.public %>/<%= pkg.img %>/',
        filter: 'isFile',
      },
      css: {
        expand: true,
        cwd: '<%= pkg.static_html %>/<%= pkg.css %>/',
        src: '**/*',
        dest: '<%= pkg.public %>/<%= pkg.css %>/',
        filter: 'isFile',
      },
      js: {
        expand: true,
        cwd: '<%= pkg.static_html %>/<%= pkg.js %>/',
        src: 'build.min.js',
        dest: '<%= pkg.public %>/<%= pkg.js %>/',
        filter: 'isFile',
      }
    },


    /**
     * cssmin
     */
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= pkg.static_html %>/<%= pkg.css %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= pkg.static_html %>/<%= pkg.css %>',
          ext: '.min.css'
        }]
      }
    },


    /**
     * javascript
     */
    browserify: {
      options: {},
      dist: {
        files: {
          '<%= pkg.static_html %>/<%= pkg.js %>/build.js': [
            '<%= pkg.src.js %>/script.js'
          ]
        }
      }
    },

    uglify: {
      options: {},
      target: {
        files: {
          '<%= pkg.static_html %>/<%= pkg.js %>/build.min.js': [
            '<%= pkg.static_html %>/<%= pkg.js %>/build.js'
          ]
        }
      }
    },



    /**
     * imagemin
     */
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: '<%= pkg.static_html %>/<%= pkg.src.img %>/',
            src: ['**/*.{png,jpg,jpeg,svg}', '!sprite/'],
            dest: '<%= pkg.static_html %>/<%= pkg.img %>/'
          }
        ]
      }
    },


    /**
     * compress
     */
    compress: {
      options: {
        mode: 'gzip'
      },
      css: {
        files: [
          {
            expand: true,
            src: ['<%= pkg.public %>/<%= pkg.css %>/*.min.css'],
            dest: './',
            ext: '.min.css.gz'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            src: ['<%= pkg.public %>/<%= pkg.js %>/*.min.js'],
            dest: './',
            ext: '.min.js.gz'
          }
        ]
      }
    },


    /**
     * spritesmith
     */
    sprite: {
      all: {
        src: '<%= pkg.src.img %>/sprite/*.png',
        dest: '<%= pkg.static_html %>/<%= pkg.img %>/spritesheet.png',
        destCss: '<%= pkg.src.scss %>/_sprites.scss',
        imgPath: '/<%= pkg.img %>/spritesheet.png'
      },

      mobile: {
        src: '<%= pkg.src.img %>/sprite/mobile/*.png',
        dest: '<%= pkg.static_html %>/<%= pkg.img %>/spritesheet.mobile.png',
        destCss: '<%= pkg.src.scss %>/_sprites.mobile.scss',
        imgPath: '/<%= pkg.img %>/spritesheet.mobile.png'
      }
    },



    /**
     * serve
     */
    connect: {
      server: {
        options: {
          livereload: true,
          keepalive: true,
          port: '<%= pkg.port %>',
          base: '<%= pkg.static_html %>',
          open: 'http://localhost:<%= pkg.port %>',
        }
      }
    },

    /**
     * watch
     */
    watch: {
      options: {
        livereload: true,
        spawn: false
      },

      gruntfile: {
        files: [
          'Gruntfile.js'
        ]
      },

      scss: {
        files: [
          '<%= pkg.src.scss %>/**/*.scss',
          ['<%= pkg.src.scss %>/*.scss']
        ],
        tasks: [
          'sass_globbing',
          'sass',
          'autoprefixer',
          'cssmin',
          'copy:css'
        ]
      },
      assemble: {
        files: [
          '<%= pkg.src.hbs %>/*.hbs',
          '<%= pkg.src.hbs %>/**/*.hbs',
          '<%= pkg.src.hbs %>/**/*.{json,yml}'
        ],
        tasks: [
          'assemble',
          'prettify'
        ]
      },

      js: {
        files: [
          '<%= pkg.src.js %>/*.js',
          '<%= pkg.src.js %>/**/*.js'
        ],
        tasks: [
          'browserify',
          'uglify',
          'copy:js'
        ]
      }
    }
  });


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('publish', [
    'imagemin',
    'copy:image'
  ]);
};
