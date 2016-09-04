var mock = require('./../index');
describe("Mock require module", () => {
    it("when sub-module not setted, require should return undefined", () => {
        expect(mock.require('./module1').module2).toBeUndefined();
    })
    it("when sub-module setted, require should return mock-object", () => {
        var fixture1 = "fix1";
        var fixture2 = "fix2";
        var module1 = mock.require('./module1', {
            './module2': fixture1,
            'fs': fixture2
        });
        expect(module1.module2).toBe(fixture1);
        expect(module1.fs).toBe(fixture2);
    })
})