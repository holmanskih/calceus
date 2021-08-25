import fs from 'fs';
import { appConfig } from '../config/config.js';
var FileNodeType;
(function (FileNodeType) {
    FileNodeType["Dir"] = "dir";
    FileNodeType["File"] = "file";
})(FileNodeType || (FileNodeType = {}));
export class FileNode {
    constructor(path, type, children) {
        this.path = path;
        this.type = type;
        this.children = children;
    }
}
export class Template {
    constructor() {
        this.cfg = {
            files: []
        };
    }
    static createNode(fileNode) {
        switch (fileNode.type) {
            case FileNodeType.Dir:
                console.log(`create new dir node`);
                fs.mkdirSync(fileNode.path, { recursive: true });
            case FileNodeType.File:
                console.log(`create new file node`);
                fs.writeFileSync(fileNode.path, 'hello');
            default:
                throw new Error('Unexpected file node type!');
        }
    }
    parseFromConfig() {
        if (fs.existsSync(appConfig.templatePath)) {
            const data = fs.readFileSync(appConfig.templatePath, { encoding: 'utf-8', flag: 'r' });
            const rawJSON = JSON.parse(data.toString());
            this.cfg = rawJSON;
            console.log('parseFromCfg', this.cfg);
            return this.cfg;
        }
        console.log(`Template configuration file doesn\`t exists!`);
    }
    getCfg() {
        const cfg = this.cfg ? this.parseFromConfig() : this.cfg;
        return cfg;
    }
}
