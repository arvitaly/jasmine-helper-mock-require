var Module = require('module'),
    fullpath = require('./fullpath'),
    callerId = require('caller-id'),
    Path = require('path');
var mock = {
    require: function (path, mocks) {
        var originalLoader = Module._load;
        var realMocks = {};
        var calledFrom = Path.dirname(callerId.getData().filePath);
        var realPath = fullpath(path, calledFrom);
        var realPathDir = Path.dirname(realPath);
        if (mocks) {
            for (var p in mocks) {
                realMocks[fullpath(p, calledFrom)] = mocks[p];
            }
        }
        Module._load = function () {
            var newModule = Object.assign({}, Module.prototype);
            newModule.realRequire = newModule.require; 
            newModule.require = function (requirePath) {
                var realRequest = fullpath(requirePath, realPathDir);
                if (realMocks[realRequest]) {
                    return realMocks[realRequest];
                } else {
                    return newModule.realRequire(realRequest);
                }
            }
            Module.prototype = newModule;
            return originalLoader.apply(this, arguments);
        }
        var result = require(realPath);
        delete require.cache[realPath];
        Module._load = originalLoader;
        return result;
    }
}
module.exports = mock