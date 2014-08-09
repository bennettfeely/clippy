/*
 * grunt-remfallback
 * https://github.com/thomasdobber/grunt-remfallback
 *
 * Copyright (c) 2013 Thomas Dobber
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'tasks/*.js'],
        tasks: ['jshint', 'remfallback']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/*.js'],
      options: {
        jshintrc: '.jshintrc'
      },
    },
    remfallback: {
      options: {
        log: true,
        replace: false
      },
      dist: {
        files: {
          'result/example.css': ['test/*.css']
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'remfallback', 'watch']);
};