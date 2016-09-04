var path = require('path'), fs = require('fs');
module.exports = (modulePath, basePath, npmPath) => {
    npmPath = npmPath || process.cwd() + "/node_modules";
    var fullpath;
    if (path.isAbsolute(modulePath)) {
        //Local module with absolute path
        fullpath = modulePath;
    } else {
        //Local module with relative path
        if (modulePath.substr(0, 2) === "./") {
            fullpath = path.resolve(path.join(basePath, modulePath));
        } else {
            //npm extern module            
            try {
                fullpath = path.resolve(path.join(npmPath, modulePath))
                fs.accessSync(fullpath, fs.F_OK);
            } catch (e) {
                //System module or non-existing
                fullpath = modulePath;
            }
        }
    }
    try {
        return require.resolve(fullpath);
    } catch (e) {
        return fullpath;
    }
}