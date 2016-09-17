var Module = require('module');

var originalModulePrototype = Module.prototype;

Module.prototype = Object.assign({}, Module.prototype, {
    load: function () {
        Module.prototype = originalModulePrototype;
        return Module.prototype.load.apply(this, arguments);
    },
    require: function (request) {
        if (request === './y') {
            return "mocky"
        }
        return originalModulePrototype.require.apply(this, arguments);
    }
})
//console.log(Module.prototype.constructor.toString())
console.log(require("./x"))
console.log(require("./y"))