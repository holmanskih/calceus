import fs from 'fs'
import {appConfig} from '../config/config.js'

enum FileNodeType {
    Dir = "dir",
    File = "file"
}

export class FileNode {
    private name: string;
    private type: FileNodeType;
    private children: Array<FileNode>;

    constructor(name: string, type: FileNodeType, children: Array<FileNode>) {
        this.name = name
        this.type = type 
        this.children = children
    }
}

interface TemplateCfg {
    files: Array<FileNode>
}

export class Template {
    private cfg: TemplateCfg

    constructor() {
        this.cfg = {
            files: []
        }
    }

    private parseFromConfig(): TemplateCfg | undefined {
        if(fs.existsSync(appConfig.templatePath)) {
            const data = fs.readFileSync(appConfig.templatePath, {encoding: 'utf-8', flag: 'r'})
            this.cfg = JSON.parse(data.toString())
            return this.cfg
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getCfg(): TemplateCfg | undefined {
        const cfg = this.cfg ? this.parseFromConfig() : this.cfg
        return cfg
    }
}