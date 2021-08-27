import { FileNode, FileNodeType, Schema } from "./template.js";
import path from 'path'
import fs from 'fs'
import shell from 'shelljs'

export class Bootstraper {
    private schema: Schema
    private rootPath: string

    constructor(rootPath: string, schema: Schema) {
        
        try {
            if (fs.existsSync(rootPath)) {
                this.rootPath = path.join(schema.path, rootPath + "_copy")
            } else {
                this.rootPath = path.join(schema.path, rootPath)
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.rootPath = path.join(process.cwd(), rootPath)
        }
        console.log('Bootstraper', rootPath, schema);
        
        this.schema = schema
    }

    private createNode(fileNode: FileNode): void {
        const nodePath = path.join(this.rootPath, fileNode.path)
        console.log('createNode path', nodePath);
        
        switch (fileNode.type) {
            case FileNodeType.Dir:
                console.log(`create new dir node`);
                this.createDir(nodePath)
                break

            case FileNodeType.File:
                console.log(`create new file node`);
                shell.touch(nodePath)
                break
                // fs.writeFileSync(nodePath, 'hello', {mode: 777})
            default:
                throw new Error(`Unexpected file node type: ${fileNode.type}`)
        }
    }

    private createDir(pathName: string): void {
        try {
            shell.mkdir('-p', pathName)
            // fs.mkdirSync(pathName, { mode: 777, recursive: true })
        } catch(err) {
            console.log(err);
        }
    }

    private createBaseDir(): void {
        console.log('createBaseDir', this.rootPath);
        
        shell.mkdir('-p', this.rootPath)
        console.log(`We created the new project with ${path} name`);
    }

    public bootstrap() {
        this.createBaseDir()
        const files = this.schema.files
        console.log('FileNodeType', files[1].type === FileNodeType.Dir) 

        for (let i = 0; i < files.length; i++) {
            const schemaNode = files[i]

            console.log('fsNode', schemaNode);
            this.createNode(schemaNode)
        }
    }
}