import fs from 'fs'
import { appConfig } from '../config/config.js'

enum FileNodeType {
    Dir = "dir",
    File = "file"
}

export class FileNode {
    public path: string;
    public type: FileNodeType;
    public children: Array<FileNode>;

    constructor(path: string, type: FileNodeType, children: Array<FileNode>) {
        this.path = path
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

    public static createNode(fileNode: FileNode): void {
        switch (fileNode.type) {
            case FileNodeType.Dir:
                console.log(`create new dir node`);
                fs.mkdirSync(fileNode.path, { recursive: true })

            case FileNodeType.File:
                console.log(`create new file node`);
                fs.writeFileSync(fileNode.path, 'hello')
            default:
                throw new Error('Unexpected file node type!')
        }
    }

    private parseFromConfig(): TemplateCfg | undefined {
        if (fs.existsSync(appConfig.templatePath)) {
            const data = fs.readFileSync(appConfig.templatePath, { encoding: 'utf-8', flag: 'r' })
            const rawJSON: TemplateCfg = JSON.parse(data.toString())
            this.cfg = rawJSON
            console.log('parseFromCfg', this.cfg);
            
            return this.cfg
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getCfg(): TemplateCfg | undefined {
        const cfg = this.cfg ? this.parseFromConfig() : this.cfg
        return cfg
    }
}