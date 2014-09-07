module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.initConfig({
    concat: {
      options: {
        sourcemap: true
      },
      external: {
        src: [
          'bower_components/jquery/jquery.min.js',
          'bower_components/handlebars/handlebars.min.js',
          'bower_components/ember/ember.min.js',
          'bower_components/ember-data/ember-data.min.js',
          'bower_components/ember-couchdb-kit/dist/ember-couchdb-kit.min.js'
        ],
        dest: 'tmp/elingua-external.js'
      },
      internal: {
        src: [
          'app/app.js',
          'app/**/*.js'
        ],
        dest: 'tmp/elingua-internal.js'
      },
      dev: {
        src: [
          'tmp/elingua-external.js',
          'tmp/elingua-templates-dev.js',
          'tmp/elingua-internal.js'
        ],
        dest: 'tmp/elingua.development.js'
      },
      dist: {
        src: [
          'tmp/elingua-external.js',
          'tmp/elingua-templates-dist.js',
          'tmp/elingua-internal-uglified.js'
        ],
        dest: 'dist/elingua.min.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'tmp/elingua-internal-uglified.js': ['tmp/elingua-internal.js']
        }
      }
    },
    sass: {
      options: {
        sourcemap: 'none'
      },
      dist: {
        files: {
          'dist/elingua.css': ['app/**/*.scss', '!app/**/_*.scss']
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      javascript: {
        files: ['app/**/*.js'],
        tasks: ['concat:internal', 'concat:dev']
      },
      emberTemplates: {
        files: ['app/templates/**/*.hbs'],
        tasks: ['emberTemplates:dev', 'concat:dev']
      },
      sass: {
        files: ['app/scss/**/*.scss'],
        tasks: ['sass']
      }
    },
    emberTemplates: {
      options: {
        templateBasePath: /app\/templates\//
      },
      dev: {
        files: {
          'tmp/elingua-templates-dev.js': ['app/templates/**/*.hbs']
        },
        options: {
          precompile: false
        }
      },
      dist: {
        files: {
          'tmp/elingua-templates-dist.js': ['app/templates/**/*.hbs']
        },
        options: {
          precompile: true
        }
      }
    }
  });

  // Don't forget to run the watch task!
  grunt.task.registerTask('development', ['sass', 'emberTemplates:dev', 'concat:external', 'concat:internal', 'concat:dev', 'watch']);
  grunt.task.registerTask('production', ['sass', 'emberTemplates:dist', 'concat:external', 'concat:internal', 'uglify', 'concat:dist']);
};
