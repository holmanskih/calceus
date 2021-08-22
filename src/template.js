import fs from 'fs'
import path from 'path'

const configPath = "config/template.json"

export class FileNode {
    constructor(name, type, children) {
        this.name = name
        this.type = type 
        this.children = children
    }
}

export class Template {
    constructor() {
        this._files = []
    }

    parseFromConfig() {
        if(fs.existsSync(configPath)) {
            fs.readFile(configPath, (err, data) => {
                if(err || data) {
                    console.log(``);
                }
                const templateData = JSON.parse(data)
                this._files = templateData
                console.log(templateData);
            })
            return
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getFiles() {
        return this._files
    }
}