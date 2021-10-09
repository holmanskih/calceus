import { FileNodeType, SchemaModel, Schema } from "./schema.js";
import { Template } from "./template.js";
import { IO } from "./util/io.js";
import { Yarn } from "./yarn.js";
import {CliOpts} from "./cli/opts.js";
import {TEMPLATE_KEY_DEPENDENCIES, TEMPLATE_KEY_DEV_DEPENDENCIES} from "../constants.js";

export class Bootstraper {
    private readonly projectPath: string
    private schema: SchemaModel
    private template: Template

    constructor(cliOpts: CliOpts, schema: SchemaModel) {
        this.schema = schema
        this.projectPath = cliOpts.dirPath
        this.template = new Template(cliOpts.modules)
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

                    const schemaFilePath = Schema.getSchemaFilePath(fileNode.path)
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

        const tmpl = this.template.getTemplateByKey()
        const pkgData = tmpl[TEMPLATE_KEY_DEPENDENCIES]
        const pkgDevelopmentData = tmpl[TEMPLATE_KEY_DEV_DEPENDENCIES]
        Yarn.start(this.projectPath, pkgData, pkgDevelopmentData)
    }
}