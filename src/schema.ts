import fs from 'fs'
import { IO } from './io.js'

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
        this.schemaPath = schemaPath
    }

    public parseFromConfig(): SchemaModel {
        console.log('reading the schema configuration...');
        const result = IO.readJSONConfig<SchemaModel>(this.schemaPath)
        console.log('reading the schema configuration end...');

        return result
    }
}