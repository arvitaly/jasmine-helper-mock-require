declare module "mock2" {
    function installMockPromise(): void;
    function uninstallMockPromise(): void;
    function require(modulePath: string, mocks: { [index: string]: any }): void;
    export = {
        installMockPromise: installMockPromise,
        uninstallMockPromise: uninstallMockPromise,
        require: require
    }
}