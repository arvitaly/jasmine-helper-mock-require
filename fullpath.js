//Get from https://github.com/boblauer/mock-require/blob/master/index.js
var Module = require('module'),
    join = require('path').join,
    dirname = require('path').dirname;
module.exports = function (path, calledFrom) {
    var resolvedPath;
    try {
        resolvedPath = require.resolve(path);
    } catch (e) { }


    var isExternal = /[/\\]node_modules[/\\]/.test(resolvedPath);
    var isSystemModule = resolvedPath === path;
    if (isExternal || isSystemModule) {
        return resolvedPath;
    }

    var isLocalModule = /^\.{1,2}[/\\]/.test(path);
    if (!isLocalModule) {
        return path;
    }

    var localModuleName = join(dirname(calledFrom), path);    
    return Module._resolveFilename(localModuleName);
}