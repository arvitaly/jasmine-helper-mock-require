export function installMockPromise(): void;
export function uninstallMockPromise(): void;
export function require(modulePath: string, mocks: { [index: string]: any }): void;