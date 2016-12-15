module.exports = function(grunt) {

	grunt.initConfig({
		sync: {
			main: {
				files: [{
					src: ['assets/**/*','webservice/*','*.*','!*.sublime=project','!*.sublime-workspace'],
					dest: 'C:/xampp/htdocs/v2/',
				}],
				verbose: true,
				updateAndDelete: true
			}
		},
		watch: {
			files: ['assets/**/*','webservice/*','*.*','!assets/js/*'],
			tasks: ['uglify','sync']
		},
		//lesslint: {
			//src: ['assets/**/*.less']
		//},
		uglify: {
			my_target: {
				options: {
					sourceMap: true,
					mangle: false
				},
				files: {
					'assets/js/page.min.js': [
					'assets/scripts/jquery.highlight-4.closure.js',
					'assets/scripts/jquery.sticky.js',
					'assets/scripts/jquery.tooltipster.bundle.js',
					'assets/scripts/jquery.zoom.js',
					'assets/scripts/jquery.flowtype.js',
					'assets/scripts/page.js'
					],
					'assets/js/app.min.js' : [
					'assets/scripts/app.js',
					'assets/scripts/app.dataservice.js',
					'assets/scripts/app.custom-bind.js',
					'assets/scripts/app.filter.js',
					'assets/scripts/app.main-controller.js'
					]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-sync');
	//grunt.loadNpmTasks('grunt-lesslint')
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify','sync','watch']);
};