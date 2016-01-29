module.exports = function(config) {
    config.set({
        "frameworks": ["jasmine"],
        "files": [
            "node_modules/angular/angular.min.js",
            "node_modules/angular-route/angular-route.min.js",
            "node_modules/angular-mocks/angular-mocks.js",
            "src/**/*.js",
            "test/**/*Spec.js"
        ],
        "reporters": ["progress"],
        "port": 9876,
        "colors": true,
        "logLevel": config.LOG_INFO,
        "autoWatch": true,
        "browsers": ["PhantomJS"],
        "singleRun": false,
        "concurrency": Infinity
    })
};
