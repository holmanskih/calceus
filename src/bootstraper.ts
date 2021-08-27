import { FileNode, FileNodeType, Schema } from "./template"
import fs from 'fs'
import path from 'path'

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
            this.rootPath = path.join(__dirname, rootPath)
        }

        this.schema = schema
    }

    private createNode(fileNode: FileNode): void {
        const nodePath = path.join(this.rootPath, fileNode.path)
        console.log('createNode path', nodePath);
        
        switch (fileNode.type) {
            case FileNodeType.Dir:
                console.log(`create new dir node`);
                this.createDir(nodePath)

            case FileNodeType.File:
                console.log(`create new file node`);
                fs.writeFileSync(nodePath, 'hello', {mode: 777})
            default:
                throw new Error('Unexpected file node type!')
        }
    }

    private createDir(pathName: string): void {
        try {
            fs.mkdirSync(pathName, { mode: 777, recursive: true })
        } catch(err) {
            console.log(err);
        }
    }

    private createBaseDir(): void {
        console.log('createBaseDir', this.rootPath);
        
        fs.mkdirSync(this.rootPath, { mode: 777, recursive: true })
        console.log(`We created the new project with ${path} name`);
    }

    public bootstrap() {
        this.createBaseDir()
        const files = this.schema.files
        for (let i = 0; i < files.length; i++) {
            const schemaNode = files[i]

            console.log('fsNode', schemaNode);
            this.createNode(schemaNode)
        }
    }

    private createNodes(files: Array<FileNode>) {
        for (let i = 0; i < files.length; i++) {
            const schemaNode = files[i]
            this.createNode(schemaNode)
        }
    }
}