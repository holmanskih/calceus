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
        this._cfg = {
            files: []
        }
    }

    _parseFromConfig() {
        if(fs.existsSync(appConfig.templatePath)) {
            fs.readFile(appConfig.templatePath, (err, data) => {
                if(err || !data) {
                    console.log(`Unexpected error while reading tempalate config: ${err}`);
                }
                this._cfg = JSON.parse(data)
                return this._cfg
            })
        }

        console.log(`Template configuration file doesn\`t exists!`);
    }

    getCfg() {
        return this._cfg ? this._parseFromConfig() : this._cfg
    }
}