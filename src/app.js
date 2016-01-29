angular.module("myApp", [
    "ngRoute",
    "myApp.auth",
    "myApp.dashboard"
]).config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({
        "redirectTo": "/auth"
    });
}]);