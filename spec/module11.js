module.exports = function () {
    return {
        mockPromise: Promise,
        realPromise: require('./module12')
    }
} 