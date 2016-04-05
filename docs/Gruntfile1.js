module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		protractor: {
			//options: {
			//	configFile: 'protractor.conf.js', //默认的protractor配置文件的地址。
			//	keepAlive: true, //如果是false，那么当测试失败的时候，grunt进程将会终止。咋们默认就设置true吧。
			//	noColor: false, //如果是true,那么测试结果输出将没有颜色区分，最好设置false。
			//	args: {
			//		//可以用来配置proctractor,参数跟proctractor配置文件的参数一样。
			//	}
			//},
			/*定义我们自己的模块快，可能在测试的时候我们不需要所有的模块都要跑一遍，只要跑某个模块而已，或者我们不同的环境需要不同的proctractor配置文件，那么我们就可以自定义要测试的模块，有多少个就可以定义多少个。*/
			runTest: {
				options: {
					configFile: 'protractor.conf.js', //默认的protractor配置文件的地址。
					keepAlive: true, //如果是false，那么当测试失败的时候，grunt进程将会终止。咋们默认就设置true吧。
					noColor: false, //如果是true,那么测试结果输出将没有颜色区分，最好设置false。
					args: {
						//可以用来配置proctractor,参数跟proctractor配置文件的参数一样。
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.registerTask('default', ['protractor:runTest']);
};