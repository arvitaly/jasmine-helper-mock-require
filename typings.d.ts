declare function installSyncPromise(): void;
declare function uninstallSyncPromise(): void;
declare function installSyncFS(fs): void;
declare function uninstallFSSync(fs): void;
declare function require(modulePath: string, mocks: { [index: string]: any }): void;
export = {
    installSyncPromise: installSyncPromise,
    uninstallSyncPromise: uninstallSyncPromise,
    installSyncFS: installSyncFS,
    uninstallFSSync: uninstallFSSync,
    require: require
}