var mock = require('./../index');
var fixture1 = "fix1";
var fixture2 = "fix2";
describe("Mock require module", () => {
    it("when sub-module not setted, require should return real module", () => {
        expect(mock.require('./module1').module2()).toEqual(require('./module2'));
    })
    it("when sub-module setted, require should return mock-object", () => {
        var module1 = mock.require('./module1', {
            './module2': fixture1,
            'fs': fixture2
        });
        expect(module1.module2()).toBe(fixture1);
        expect(module1.fs).toBe(fixture2);
    })
    it("when sub-module has other path, require should resolved truthy", () => {
        var module1 = mock.require('./lib/module3', {
            './module2': fixture1
        });
        expect(module1.module2).toBe(fixture1);
        expect(module1.module4).toBe("module4");
    })
    it("when sub-module has absolute path, require should resolved truthy", () => {
        var absolutePath = require.resolve('./module1');
        var modules = {};
        modules[absolutePath] = fixture1;
        var module1 = mock.require('./module5', modules);
        expect(module1(absolutePath).absModule).toBe(fixture1);
    })
    it("when module not resolved, should use path as is", () => {
        var module1 = mock.require('./module6', {
            './module7': fixture1
        });
        expect(module1.module7).toBe(fixture1);
    })
    it("when module real require, module in sub-module should be not-mocked", () => {
        expect(mock.require('./module8', {
            './module10': "mockmodule10"
        })).toEqual({ module9: "realmodule10", module10: "mockmodule10" });
    })
})