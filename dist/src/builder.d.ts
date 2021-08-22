export declare const dirPath = "dirPath";
export declare const modules = "modules";
export declare const projectName = "projectName";
export declare class Builder {
    constructor(cliData: any);
    _parse(cliData: any): void;
    getModules(): any;
    getDirPath(): any;
    bootstrap(): void;
    _createBaseDir(): void;
}
