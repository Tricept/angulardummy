beforeEach(module("myApp.dashboard"));

describe("routes", function() {
    it("should map /dashboard", inject(function($route) {
        expect($route.routes["/dashboard"].controller).toEqual("DashboardController");
        expect($route.routes["/dashboard"].templateUrl).toEqual("templates/dashboard.html");
    }));
});

describe("dashboard controller", function() {
    var controller, scope, auth;

    beforeEach(inject(function($controller, $injector) {
        auth = $injector.get("auth");
        spyOn(auth, "logout");
        scope = {};
        controller = $controller("DashboardController", {
            "$scope": scope,
            "auth": auth
        });
    }));

    it("should redirect to auth when user is not logged in", inject(function($location) {
        expect($location.path()).toEqual("/auth");
    }));

    describe("logout method", function() {
        it("should call logout method of auth service", function() {
            scope.logout();
            expect(auth.logout).toHaveBeenCalled();
        });
    });
});