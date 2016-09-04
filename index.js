var Module = require('module'),
    fullpath = require('./fullpath'),
    callerId = require('caller-id');
var mock = {
    require: function (path, mocks) {
        var originalLoader = Module._load;
        var realMocks = {};
        var calledFrom = callerId.getData().filePath;
        var realPath = fullpath(path, calledFrom);
        if (mocks) {
            for (var p in mocks) {
                realMocks[fullpath(p, calledFrom)] = mocks[p];
            }
        }
        Module._load = function (request) {
            if (request === realPath) {
                return originalLoader.apply(this, arguments);
            }
            var realRequest = fullpath(request, calledFrom);
            if (realMocks[realRequest]) {
                return realMocks[realRequest];
            } else {
                return;
            }
        }
        var result = require(realPath);
        delete require.cache[realPath];
        Module._load = originalLoader;
        return result;
    }
}
module.exports = mock