beforeEach(module("myApp"));

describe("routes", function() {
    it("should provide default route", inject(function($route) {
        expect($route.routes[null].redirectTo).toEqual("/auth");
    }));
});