module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js', 
        'lib/**/*.js', 
        'tasks/**/*.js', 
        'bin/**/*.js', 
        'test/**/*.js'
      ]
    },
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    simplemocha: {
      options: {
        ui: 'tdd',
        reporter: 'list',
        growl: true
      },
      all: {
        src: 'test/**/*.test.js'
      }
    }
  });

  // Load local tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('dev', ['watch']);

};
