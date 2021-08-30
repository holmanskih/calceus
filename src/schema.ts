import fs from 'fs'
import { Utils } from './utils.js'

export enum FileNodeType {
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

    public parseFromConfig(): SchemaModel {
        return Utils.readJSONConfig<SchemaModel>(this.schemaPath)
    }
}