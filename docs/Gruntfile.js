/**
 * Created by LinLin on 2014/12/12.
 */
module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		pkg: grunt.file.readJSON('package.json'),
		// copy: {
		// 	coverageE2E: {
		// 		files: [{
		// 			expand: true,
		// 			dot: true,
		// 			cwd: '<%= dirs.app %>',
		// 			dest: '<%= dirs.instrumentedE2E %>/app',
		// 			src: [
		// 				'*.{ico,png,txt}',
		// 				'.htaccess',
		// 				'bower_components/**/*',
		// 				'images/**/*',
		// 				'fonts/**/*',
		// 				'views/**/*',
		// 				'styles/**/*',
		// 			]
		// 		}]
		// 	},
		// },
		copy: {
			instrument: {
				files: [{
					src: ['src/app/**/*', '!src/app/**/*.js'],
					dest: 'coverage/e2e/instrumented/'
				}]
			},
		},

		clean: {
			coverage: ['coverage', 'instrumented', 'reports']
		},


		instrument: {
			files: 'src/app/**/*.js',
			options: {
				lazy: true,
				basePath: 'coverage/e2e/instrumented'
			}
		},
		protractor: {
			options: {
				// configFile: 'node_modules/protractor/referenceConf.js', //默认的protractor配置文件的地址。
				keepAlive: true, //如果是false，那么当测试失败的时候，grunt进程将会终止。咋们默认就设置true吧。
				noColor: false, //如果是true,那么测试结果输出将没有颜色区分，最好设置false。
				args: {
					//可以用来配置proctractor,参数跟proctractor配置文件的参数一样。
				}
			},
			/*定义我们自己的模块快，可能在测试的时候我们不需要所有的模块都要跑一遍，只要跑某个模块而已，或者我们不同的环境需要不同的proctractor配置文件，那么我们就可以自定义要测试的模块，有多少个就可以定义多少个。*/
			runTest: {
				options: {
					// configFile: 'D:/KFenv/PHP_APACHE_SERVER/WWW/angular-1.3.5/docs/proctractor.conf.js',
					// keepAlive: true, //如果是false，那么当测试失败的时候，grunt进程将会终止。咋们默认就设置true吧。
					// noColor: false, //如果是true,那么测试结果输出将没有颜色区分，最好设置false。
					args: {
						allScriptsTimeout: 11000,

						specs: [
							'ptore2e/example-$route-service/jquery*.js'
						],

						capabilities: {
							'browserName': 'chrome'
						},

						baseUrl: 'http://localhost:8888/angular-1.3.5/docs',

						framework: 'jasmine',

						jasmineNodeOpts: {
							defaultTimeoutInterval: 30000
						}
					}
				}
			}
		},
		protractor_coverage: {
			options: {
				configFile: 'test/protractor/protractorConf.js', // Default config file
				keepAlive: true, // If false, the grunt process stops when the test fails.
				noColor: false, // If true, protractor will not use colors in its output.
				coverageDir: 'ptore2e/example-$route-service',
				args: {}
			},
			chrome: {
				options: {
					configFile: 'protractor.conf.js', // Default config file
					// coverageDir: 'ptore2e/example-$route-service',
					args: {
						//baseUrl: 'http://localhost:3000/',
						//Arguments passed to the command
						//'browser': 'chrome'
					}
				}
			}
		},
		protractor_coverageSB: {
			options: {
				keepAlive: true,
				noColor: false,
				coverageDir: 'path/to/coverage/dir',
				args: {
					baseUrl: 'http://localhost:8888/angular-1.3.5/docs'
				}
			},
			local: {
				options: {
					configFile: 'path/to/protractor-local.conf.js'
				}
			},
			travis: {
				options: {
					configFile: 'path/to/protractor-travis.conf.js'
				}
			}
		},		
		makeReport: {
			src: 'ptore2e/example-$route-service/coverage.json',
			options: {
				type: 'html',
				dir: 'reports',
				print: 'detail'
			}
		}
	});
    // grunt.loadTasks('tasks');
// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-istanbul');
	grunt.loadNpmTasks('grunt-coveralls');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-protractor-coverage');
	grunt.registerTask('test', ['protractor_coverage']);
	grunt.registerTask('default', [
		//'protractor',
		'protractor_coverage'
		,'clean'
		,'copy'
		,'instrument'
		// ,'makeReport'
	]);
};