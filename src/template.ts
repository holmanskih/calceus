import fs from 'fs'
import { appConfig } from '../config/config.js'

export enum FileNodeType {
    Dir = "dir",
    File = "file"
}

export type FileNode = {
    path: string;
    type: FileNodeType;
    children: Array<FileNode>;
}

export type Schema = {
    path: string
    files: Array<FileNode>
}

export class Template {
    private cfg: Schema

    constructor() {
        this.cfg = {
            path: '',
            files: []
        }
    }

    private parseFromConfig(): Schema | undefined {
        if (fs.existsSync(appConfig.templatePath)) {

            const data = fs.readFileSync(appConfig.templatePath, { encoding: 'utf-8', flag: 'r' })
            const rawJSON: Schema = JSON.parse(data.toString())
            this.cfg = rawJSON
            console.log('parseFromCfg', this.cfg);

            return this.cfg
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getCfg(): Schema | undefined {
        const cfg = this.cfg ? this.parseFromConfig() : this.cfg
        return cfg
    }
}