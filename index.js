/* eslint-disable no-native-reassign */
var Module = require('module'),
    resolve = require('resolve-module-path'),
    Path = require('path'),
    SyncPromise = require('promise-sync-es6'),
    fs = require('fs'),
    realFS = {},
    realPromise = global.Promise;
var mock = {
    installSyncPromise: function () {
        Promise = global.Promise = SyncPromise;
    },
    uninstallSyncPromise: function () {
        Promise = global.Promise = realPromise;
    },
    installSyncFS: function (fs_) {
        fs = fs_ || fs;
        Object.keys(fs).map((key) => {
            if (fs[key + "Sync"]) {
                realFS[key] = fs[key];
                fs[key] = function () {
                    var args = [];
                    for (var i = 0; i < arguments.length - 1; i++) {
                        args.push(arguments[i]);
                    }
                    var callback = arguments[arguments.length - 1];
                    try {
                        callback(null, fs[key + "Sync"].apply(fs, args));
                    } catch (e) {
                        callback(e);
                    }
                }
            }
        })
    },
    uninstallSyncFS: function (fs_) {
        fs = fs_ || fs;
        for (var key in realFS) {
            fs[key] = realFS[key];
        }
    },
    require: function (path, mocks) {
        var realMocks = {};
        var realPath = resolve(path, {
            stackDepth: 1
        });
        var realPathDir = Path.dirname(realPath);
        if (mocks) {
            for (var p in mocks) {
                realMocks[resolve(p, {
                    stackDepth: 1
                })] = mocks[p];
            }
        }
        var originalModulePrototype = Module.prototype;
        Module.prototype = Object.assign({}, Module.prototype, {
            load: function () {
                this.constructor = { _resolveFilename: Module._resolveFilename };
                Module.prototype = originalModulePrototype;
                return Module.prototype.load.apply(this, arguments);
            },
            require: function (request) {
                var realRequest = resolve(request, {
                    basePath: realPathDir
                });
                if (realMocks[realRequest]) {
                    return realMocks[realRequest];
                } else {
                    return originalModulePrototype.require.apply(this, arguments);
                }
            }
        })
        var result = require(realPath);
        delete require.cache[realPath];
        return result;
    }
}
module.exports = mock