import { FileNodeType, SchemaModel as Schema } from "./schema.js";
import fs from 'fs'
import { Template } from "./template.js";
import { appConfig, getSchemaFilePath } from "../config/config.js";
import { IO } from "./io.js";
import { Yarn } from "./yarn.js";

export class Bootstraper {
    private schema: Schema
    private template: Template
    private projectPath: string
    private configurationKey: string

    constructor(projectPath: string, schema: Schema, configurationKey: string) {
        this.schema = schema
        this.projectPath = projectPath
        this.configurationKey = configurationKey
        this.template = new Template(configurationKey)

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
        IO.createDirRec(this.projectPath)
    }

    private createFileNodesBySchema = () => {
        const files = this.schema.files

        for (let i = 0; i < files.length; i++) {
            const fileNode = files[i]

            switch (fileNode.type) {
                case FileNodeType.File: {
                    const dirPath = IO.formRootDirPathFromFile(this.projectPath, fileNode.path)
                    IO.createDirRec(dirPath)

                    const schemaFilePath = getSchemaFilePath(fileNode.path)
                    IO.copyFile(schemaFilePath, dirPath)
                    break
                }

                case FileNodeType.Template: {
                    this.template.moveToBootstrap(this.projectPath)
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

        const pkgData = this.template.getTemplateByKey().modules
        Yarn.start(this.projectPath, pkgData)
    }
}