import { FileNode, FileNodeType, SchemaModel as Schema } from "./schema.js";
import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import { Template } from "./template.js";
import { appConfig, getSchemaFilePath } from "../config/config.js";
import { Utils } from "./utils.js";

enum BootstraperCmd {
    // creates new directory by schema configuration
    CreateRoot,

    // create a copy of new directory by schema if such directory 
    // already exists
    CreateRootCopy,

    // ceateas  a new directory by schema path with absolute path
    CreateRootAbs,

    // creates a new child directory with respect to parent schema node
    CreateChild
}

export class Bootstraper {
    private schema: Schema
    private template: Template
    private projectPath: string
    private configurationKey: string

    constructor(projectPath: string, schema: Schema, configurationKey: string) {
        this.schema = schema
        this.projectPath = projectPath
        this.configurationKey = configurationKey
        this.template = new Template()

        // check if .calceus directory exists
        const isExists = this.isExists()
        if (!isExists) {
            throw new Error('.calceus path is not correct, such directory doesnt exist')
        }
    }

    private isExists(): boolean {
        return fs.existsSync(appConfig.calceusPath)
    }

    private createBaseDirNode(): void {
        console.log('root path is', this.projectPath);

        Utils.createDirRec(this.projectPath)
    }

    private createFileNodesBySchema = () => {
        const files = this.schema.files

        for (let i = 0; i < files.length; i++) {
            const fileNode = files[i]

            switch (fileNode.type) {
                case FileNodeType.File: {
                    const dirPath = Utils.formRootDirPathFromFile(this.projectPath, fileNode.path)
                    Utils.createDirRec(dirPath)

                    const schemaFilePath = getSchemaFilePath(fileNode.path)
                    Utils.copyFile(schemaFilePath, dirPath)
                    break
                }

                case FileNodeType.Template: {

                    break
                }

                default:
                    throw new Error(`undefined file node type in schema ${fileNode.type}`)
            }
        }
    }

    public bootstrap() {
        this.createBaseDirNode()
        this.createFileNodesBySchema()
        this.template.moveToBootstrap(this.projectPath, this.configurationKey)
    }
}