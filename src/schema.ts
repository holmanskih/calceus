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
    private schemaPath: string

    constructor(schemaPath: string) {
        this.model = {
            files: []
        }

        const exists = fs.existsSync(schemaPath)
        if(!exists) {
            throw new Error(`schema with path ${schemaPath} doesnt exists`)
        }

        this.schemaPath = schemaPath
    }

    private parseFromConfig(): SchemaModel | undefined {
        if (fs.existsSync(this.schemaPath)) {

            const data = fs.readFileSync(this.schemaPath, { encoding: 'utf-8', flag: 'r' })
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