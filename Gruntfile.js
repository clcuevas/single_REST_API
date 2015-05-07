'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['*.js', '/models/**/*.js', '/routes/**/*.js', '/test/**/*.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    simplemocha: {
      dev: {
        src: ['/test/**/*.js']
      }
    },
    watch: {
      app: {
        files: ['<%= jshint.dev.src %>']
        tasks: ['jshint', 'simplemocha']
      }
    }
  });//end grunt initConfig

  grunt.registerTest('test', ['jshint:dev']);
  grunt.registerTest('mocha', ['simeplemocha:dev']);
  grunt.registerTest('default', ['test', 'mocha', 'watch']);
};