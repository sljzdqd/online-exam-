module.exports=function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        jshint:{
            build:['Gruntfile.js', 'views/*.js','views/*.ejs','app.js','public/*.js'],
            options:{
                jshintrc:'.jshintrc'
            }
            
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default',[ 'jshint']);
};