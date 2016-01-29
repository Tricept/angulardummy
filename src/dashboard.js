angular.module("myApp.dashboard", ["ngRoute"]).config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/dashboard", {
            "templateUrl": "templates/dashboard.html",
            "controller": "DashboardController"
        });
}]);

angular.module("myApp.dashboard").controller("DashboardController", ["$scope", "auth", "$location", function($scope, auth, $location) {
    if(!auth.isLoggedIn()) {
        $location.path("/auth");
    }

    $scope.logout = function() {
        auth.logout();
    }
}]);