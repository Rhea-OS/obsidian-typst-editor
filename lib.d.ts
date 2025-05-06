declare module '*.css?raw' {
    const str: string;
    export default str;
}

type FileSystemObserverCallback = (records: FileSystemChangeRecord[], observer: FileSystemObserver) => void;

interface FileSystemObserverObserveOptions {
    recursive?: boolean;
}

enum FileSystemChangeType {
    appeared = 'appeared',
    disappeared = 'disappeared',
    modified = 'modified',
    moved = 'moved',
    unknown = 'unknown',
    errored = 'errored',
}

interface FileSystemChangeRecord {
    readonly changedHandle: FileSystemFileHandle | FileSystemDirectoryHandle;
    readonly relativePathComponents: ReadonlyArray<string>;
    readonly type: FileSystemChangeType;
    readonly relativePathMovedFrom?: ReadonlyArray<string>;
}

class FileSystemObserver {
    constructor(callback: FileSystemObserverCallback);
    observe(handle: FileSystemFileHandle | FileSystemDirectoryHandle, options?: FileSystemObserverObserveOptions): Promise<void>;
    unobserve(handle: FileSystemFileHandle): void;
    disconnect(): void;
}