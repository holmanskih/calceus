import path from "path"
import {cfg} from "../config/config.js"

export class Modules {
    public static getSchemaFilePath = (rawSchemaFilePath: string): string => {
        return path.join(cfg.schemaPath, rawSchemaFilePath)
    }
}