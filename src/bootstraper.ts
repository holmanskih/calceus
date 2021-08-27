import { FileNode, FileNodeType, Schema } from "./template.js";
import path from 'path'
import fs from 'fs'
import shell from 'shelljs'

enum BootstraperCmd {
    // creates new directory by schema configuration
    CreateRoot,

    // create a copy of new directory by schema if such directory 
    // already exists
    CreateRootCopy,

    // ceateas  a new directory by schema path with absolute path
    CreateRootAbs
}
export class Bootstraper {
    private schema: Schema
    private root: string

    constructor(root: string, schema: Schema) {
        this.schema = schema

        try {
            this.root = fs.existsSync(root) ? 
                Bootstraper.formPath(BootstraperCmd.CreateRootCopy, schema, root) : 
                Bootstraper.formPath(BootstraperCmd.CreateRoot, schema, root)
        } catch (err) {
            console.log(`failed to resolve the schema root path configuration: ${err}`);
        } finally {
            this.root = Bootstraper.formPath(BootstraperCmd.CreateRootAbs, schema, root)
        }
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

            default: {
                throw new Error(`Unexpected file node type: ${fileNode.type}`)
            }
        }
    }

    // helper method to form new path 
    private static formPath(cmd: BootstraperCmd, schema: Schema, root: string): string {
        switch(cmd) {
            case BootstraperCmd.CreateRoot: {
                return path.join(schema.path, root)
            }

            case BootstraperCmd.CreateRootCopy: {
                return path.join(schema.path, root + "_copy")
            }

            case BootstraperCmd.CreateRootAbs: {
                return path.join(process.cwd(), root)
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
        console.log(`create new file: ${pathName}...`);
        shell.touch(pathName)
    }

    private createBaseDirNode(): void {
        Bootstraper.createDirRecursively(this.root)
    }

    private createFileNodes(): void {
        const files = this.schema.files

        for (let i = 0; i < files.length; i++) {
            this.createFileNode(files[i])
        }
    }

    public bootstrap() {
        this.createBaseDirNode()
        this.createFileNodes()
    }
}