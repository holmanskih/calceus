import fs from 'fs'
import {appConfig} from '../config/config.js'

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

    _parseFromConfig() {
        if(fs.existsSync(appConfig.templatePath)) {
            fs.readFile(appConfig.templatePath, (err, data) => {
                if(err || !data) {
                    console.log(`Unexpected error while reading tempalate config: ${err}`);
                }
                return JSON.parse(data)
            })
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getFiles() {
        if(this._files) {
            this.__files = this._parseFromConfig()
            return this.__files
        }
    }
}