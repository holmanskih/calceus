import { IO } from './io.js'
import path from "path";
import {cfg} from "../config.js";

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
    public static parseFromConfig(schemaConfigurationPath: string): SchemaModel {
        console.log('reading the schema configuration...');
        const result = IO.readJSONConfig<SchemaModel>(schemaConfigurationPath)
        if(!result) {
            throw new Error('Project schema model is undefined!')
        }
        console.log('reading the schema configuration end...');

        return result
    }

    public static getSchemaFilePath = (rawSchemaFilePath: string): string => {
        return path.join(cfg.schemaPath, rawSchemaFilePath)
    }
}