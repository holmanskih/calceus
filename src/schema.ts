import fs from 'fs'
import { appConfig } from '../config/config.js'

export enum FileNodeType {
    Dir = "dir",
    File = "file",
    Template = "template",
}

export type FileNode = {
    path: string;
    type: FileNodeType;
}

export type SchemaModel = {
    files: Array<FileNode>
}

export class Schema {
    private model: SchemaModel

    constructor() {
        this.model = {
            files: []
        }
    }

    private parseFromConfig(): SchemaModel | undefined {
        if (fs.existsSync(appConfig.projectTemplatePath)) {

            const data = fs.readFileSync(appConfig.projectTemplatePath, { encoding: 'utf-8', flag: 'r' })
            const rawJSON: SchemaModel = JSON.parse(data.toString())
            this.model = rawJSON
            console.log('parseFromCfg', this.model);

            return this.model
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getCfg(): SchemaModel | undefined {
        const cfg = this.model ? this.parseFromConfig() : this.model
        return cfg
    }
}