# Mock2

[![npm version](https://badge.fury.io/js/mock2.svg)](https://badge.fury.io/js/mock2)
[![Build Status](https://travis-ci.org/arvitaly/mock2.svg?branch=master)](https://travis-ci.org/arvitaly/mock2)
[![Coverage Status](https://coveralls.io/repos/github/arvitaly/mock2/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/mock2?branch=master)

Module for testing node modules, which mocking any submodules without change global require (local mock.require). Mock2 mocking `require` for `module` object, so it works every time when you call require (lazy), not only for first load.

Has installSyncPromise and uninstallSyncPromise, which make all promises sync.

Has installSyncFS and uninstallSyncFS, which transform all async methods from require('fs') to their sync equivalent 


#Install

    npm install mock2 --save-dev

#Example

    var fixture1 = "fix1";
    var fixture2 = "fix2";
    var module1 = mock.require('./module1', {
        './module2': fixture1,
        'fs': fixture2
    });
    expect(module1.module2()).toBe(fixture1);
    expect(module1.fs).toBe(fixture2);
    //real require
    expect(module3).toBe("module3");
    
    //module1.js
    module.exports = {
        //Also mocked
        module2: () => { return require('./module2') },
        fs: require('fs'),
        module3: require('./module3')    
    }
    //module3.js
    module.exports = 'module3';
    
# See also

https://github.com/bahmutov/really-need - mocking with pre- and post-hooks and run in VM

https://github.com/thlorenz/proxyquire - local mock requiring with many settings. Works by mock require.extensions

https://github.com/mfncooper/mockery - global mocking

http://bahmutov.calepin.co/hacking-node-require.html - article about module `Module`

https://github.com/jhnns/rewire - mocking with read and eval source file, you can do anything with your code.

https://github.com/boblauer/mock-require - global simple mocking

https://github.com/facebook/jest/blob/master/packages/jest-haste-map/src/lib/extractRequires.js - interesting solution from Facebook and Jest. Just read file and replace code with regular expressions!

