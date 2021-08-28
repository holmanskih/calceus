import { FileNode, FileNodeType, SchemaModel } from "./schema.js";
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
    CreateRootAbs,

    // creates a new child directory with respect to parent schema node
    CreateChild
}

export class Bootstraper {
    private schema: SchemaModel
    private root: string

    constructor(root: string, schema: SchemaModel) {
        this.schema = schema


        this.root = root

        // try {
        //     this.root = fs.existsSync(root) ?
        //         this.formPath(BootstraperCmd.CreateRootCopy, root) :
        //         this.formPath(BootstraperCmd.CreateRoot, root)
        // } catch (err) {
        //     console.log(`failed to resolve the schema root path configuration: ${err}`);
        // } finally {
        //     this.root = this.formPath(BootstraperCmd.CreateRootAbs, root)
        // }
    }

    private createFileNode(fileNode: FileNode): void {
        const nodePath = path.join(this.root, fileNode.path)

        switch (fileNode.type) {
            case FileNodeType.Dir: {
                Bootstraper.createDirRecursively(nodePath)
                // Bootstraper.navigateToDir(nodePath)
                // fileNode.children.forEach((node) => {
                //     this.createFileNode(node)
                // })
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

        // walk to children by schema
        // this.walkFileNode(fileNode, fileNode.path)
    }

    // // run with a loop and traverse until the child exists if not
    // // clear the file prefix path and go on
    // private walkFileNode(fileNode: FileNode, root: string): void {
    //     if (fileNode.children && fileNode.children.length > 0) {
    //         fileNode.children.forEach((innerNode) => {
    //             let updatedinnerNode = innerNode
    //             updatedinnerNode.path = this.formPath(BootstraperCmd.CreateChild, root)
    //             this.createFileNode(innerNode)
    //         })
    //     }
    // }

    // private formRelativePathByKey(currNode: FileNode): string {
    //     if(currNode.parentKey != null) {
    //         const currPath = currNode.path
    //         const parentNode = this.searchTagByParentKey(currNode, currNode.parentKey)
    //         const newPath = path.join()
    //     }
    // }

    // private searchTagByParentKey = (element: FileNode, searchKey: string): FileNode | null => {
    //     if (element.parentKey == searchKey) {
    //         return element;
    //     }
    //     if (element.children != null) {
    //         let i;
    //         let result: FileNode | null = null;
    //         for (i = 0; result == null && i < element.children.length; i++) {
    //             result = this.searchTagByParentKey(element.children[i], searchKey);
    //         }
    //         return result;
    //     }
    //     return null;
    // }

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

    // private static navigateToDir(pathName: string): void {
    //     console.log(`navigate to path: ${pathName}...`);
    //     shell.cd(pathName)
    // }

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

    public bootstrap() {
        this.createBaseDirNode()
        this.createFileNodes()
    }
}