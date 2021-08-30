import { FileNode, FileNodeType, SchemaModel as Schema } from "./schema.js";
import path from 'path'
import fs from 'fs'
import shell from 'shelljs'
import { Template } from "./template.js";
import { appConfig, getSchemaFilePath } from "../config/config.js";

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
    private root: string

    constructor(root: string, schema: Schema) {
        this.schema = schema
        this.root = root
        this.template = new Template()


        // check if .calceus directory exists
        const isExists = this.isExists()
        if(!isExists) {
            throw new Error('.calceus path is not correct, such directory doesnt exist')
        }
    }

    private isExists(): boolean {
        return fs.existsSync(appConfig.calceusPath)
    }

    private createFileNode(fileNode: FileNode): void {
        const nodePath = path.join(this.root, fileNode.path)

        switch (fileNode.type) {
            case FileNodeType.Dir: {
                Bootstraper.createDirRecursively(nodePath)
                break
            }

            case FileNodeType.File: {
                Bootstraper.createFile(nodePath)
                shell.touch(nodePath)
                break
            }

            case FileNodeType.Template: {
                console.log('adding template configuration...');
                //todo: add template init logic
                // Bootstraper.createFile(nodePath)
                // shell.touch(nodePath)
                break
            }

            default: {
                throw new Error(`Unexpected file node type: ${fileNode.type}`)
            }
        }
    }

    // helper method to form new path 
    private formPath(cmd: BootstraperCmd, root: string): string {
        switch (cmd) {
            case BootstraperCmd.CreateRoot: {
                return root
            }

            case BootstraperCmd.CreateRootCopy: {
                return path.join(this.root, "_copy")
            }

            case BootstraperCmd.CreateRootAbs: {
                return path.join(process.cwd(), root)
            }

            case BootstraperCmd.CreateChild: {
                return path.join(root)
            }

            default: {
                throw new Error("Failed to resolve the boostraper cmd in form path!")
            }
        }
    }

    // helper method to create a new directory
    private static createDirRecursively(pathName: string): void {
        console.log(`create new dir: ${pathName}...`);
        shell.mkdir('-p', pathName)
    }

    // helper method to create a new file
    private static createFile(pathName: string): void {
        // todo castom configuration!
        const pathData = pathName.split("/")
        const fileName = pathData[pathData.length - 1]
        const dirPath = pathName.substring(0, pathName.length - fileName.length - 1)

        Bootstraper.createDirRecursively(dirPath)

        console.log(
            'pathName', pathName,
            'pathData', pathData,
            'fileName', fileName,
            'dirPath', dirPath
        );

        console.log(`create new file: ${pathName}...`);
        shell.touch(pathName)
    }

    private createBaseDirNode(): void {
        console.log('root path is', this.root);

        Bootstraper.createDirRecursively(this.root)
    }

    private createFileNodes(): void {
        const files = this.schema.files

        for (let i = 0; i < files.length; i++) {
            this.createFileNode(files[i])
        }
    }

    public static copyFile(path: string, dest: string) {
        shell.cp('-f', path, dest)

        // fs.copyFile(path, dest, fs.constants.COPYFILE_FICLONE_FORCE, (err: NodeJS.ErrnoException | null) => {
        //     console.log(`failed to create new file from schema ${err}`);
        // })
    }

    private createFileNodesBySchema = () => {
        const files = this.schema.files

        for (let i = 0; i < files.length; i++) {
            const fileNode = files[i]
            const nodePath = path.join(this.root, fileNode.path)

            const schemaFilePath = getSchemaFilePath(fileNode.path)
            Bootstraper.copyFile(schemaFilePath, nodePath)
        }
    }

    public bootstrap() {
        this.createBaseDirNode()
        // this.createFileNodes()
        this.createFileNodesBySchema()
    }
}