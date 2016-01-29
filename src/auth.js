angular.module("myApp.auth", ["ngRoute"]).config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/auth", {
            "templateUrl": "templates/auth.html",
            "controller": "AuthController"
        });
}]);

angular.module("myApp.auth").factory("auth", ["$rootScope", "$location", function($rootScope, $location) {
    var _isLoggedIn = false;

    var login = function(username, password) {
        if(username == "user" && password == "1234") {
            _isLoggedIn = true;
            $rootScope.$broadcast("successful_login");
        } else {
            $rootScope.$broadcast("unsuccessful_login");
        }
    };

    var logout = function() {
        _isLoggedIn = false;
        $location.path("/auth");
    };

    var isLoggedIn = function() {
        return _isLoggedIn;
    };

    return {
        "login": login,
        "logout": logout,
        "isLoggedIn": isLoggedIn
    };
}]);

angular.module("myApp.auth").controller("AuthController", ["$scope", "auth", "$location", function($scope, auth, $location) {
    $scope.failed = false;

    $scope.login = function() {
        auth.login($scope.username, $scope.password);
    };

    $scope.$on("successful_login", function() {
        $location.path("/dashboard");
    });

    $scope.$on("unsuccessful_login", function() {
        $scope.failed = true;
    });
}]);