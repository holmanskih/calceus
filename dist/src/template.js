import fs from 'fs';
import { appConfig } from '../config/config.js';
var FileNodeType;
(function (FileNodeType) {
    FileNodeType["Dir"] = "dir";
    FileNodeType["File"] = "file";
})(FileNodeType || (FileNodeType = {}));
export class FileNode {
    constructor(name, type, children) {
        this.name = name;
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
    parseFromConfig() {
        if (fs.existsSync(appConfig.templatePath)) {
            const data = fs.readFileSync(appConfig.templatePath, { encoding: 'utf-8', flag: 'r' });
            this.cfg = JSON.parse(data.toString());
            return this.cfg;
        }
        console.log(`Template configuration file doesn\`t exists!`);
    }
    getCfg() {
        const cfg = this.cfg ? this.parseFromConfig() : this.cfg;
        return cfg;
    }
}
