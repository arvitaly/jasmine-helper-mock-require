export function installMockPromise(): void;
export function uninstallMockPromise(): void;
export function require(modulePath: string, mocks: { [index: string]: any }): any;
export function installSyncFS(fs): void;
export function uninstallFSSync(fs): void;