const path = require('path');
module.exports = function(config) {
  config.set({
    plugins :[
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-firefox-launcher',
      'karma-webpack',
      'karma-coverage-istanbul-reporter',
      'karma-mocha-reporter'],
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.js'
    ],


    // list of files to exclude

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js':['webpack']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: [ 'lcov' ],
      fixWebpackSourcePaths: true,
      dir:'./reports/coverage'
    },
    webpack:{
      devtool: 'inline-source-map',
      module:{
        rules: [
          {
            test: /\.js$/,
            include: path.resolve('.temp/'),
            loader:'istanbul-instrumenter-loader',
            query: {
              esModules: 'module'
            }
          }
        ]
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
