beforeEach(module("myApp.auth"));

describe("routes", function() {
    it("should map /auth", inject(function($route) {
        expect($route.routes["/auth"].controller).toEqual("AuthController");
        expect($route.routes["/auth"].templateUrl).toEqual("templates/auth.html");
    }));
});

describe("auth service", function() {
    var auth, rootScope;

    beforeEach(inject(function($injector, $rootScope) {
        rootScope = $rootScope;
        auth = $injector.get("auth", {
            $rootScope: rootScope
        });
    }));

    describe("login method", function() {
        it("should broadcast successful event", function(done) {
            rootScope.$on("successful_login", done);
            auth.login("user", "1234");
        });

        it("should broadcast unsuccessful event", function(done) {
            rootScope.$on("unsuccessful_login", done);
            auth.login("foo", "bar");
        });
    });

    describe("logout method", function() {
        it("should redirect to auth", inject(function($location) {
            auth.logout();
            expect($location.path()).toEqual("/auth");
        }));
    });

    describe("isLoggedIn method", function() {
        it("should return false by default", function() {
            expect(auth.isLoggedIn()).toEqual(false);
        });

        it("should return true after successful login", function() {
            auth.login("user", "1234");
            expect(auth.isLoggedIn()).toEqual(true);
        });

        it("should return false after logout", function() {
            auth.login("user", "1234");
            auth.logout();
            expect(auth.isLoggedIn()).toEqual(false);
        });
    });
});

describe("auth controller", function() {
    var rootScope, scope, controller, auth;

    beforeEach(inject(function($rootScope, $controller) {
        auth = {"login": jasmine.createSpy()};
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller("AuthController", {
            "$scope": scope,
            "auth": auth
        });
    }));

    describe("failed attribute", function() {
        it("should be false by default", function() {
            expect(scope.failed).toEqual(false);
        });

        it("should be true after unsuccessful login", function() {
            rootScope.$broadcast("unsuccessful_login");
            expect(scope.failed).toEqual(true);
        });
    });

    describe("login method", function() {
        it("should call login method of auth service", function() {
            scope.username = "foobar";
            scope.password = "123456";
            scope.login();
            expect(auth.login).toHaveBeenCalledWith("foobar", "123456");
        });
    });

    it("should redirect to dashboard after successful login", inject(function($location) {
        rootScope.$broadcast("successful_login");
        expect($location.path()).toEqual("/dashboard");
    }));
});