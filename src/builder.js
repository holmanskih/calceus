import fs from 'fs'
import { Template } from './template.js'

export const dirPath = 'dirPath'
export const modules = 'modules'
export const projectName = 'projectName'

export class Builder {
    constructor(cliData) {
        this._dirPath = ''
        this._modules = ''
        this._projectName = ''

        this._parse(cliData)
    }

    _parse(cliData) {
        this._dirPath = cliData[dirPath]
        this._modules = cliData[modules]
        this._projectName = cliData[projectName]
        console.log(this);
    }

    getModules() {
        return this._modules
    }

    getDirPath() {
        return this._dirPath
    }

    bootstrap() {
        const boostrapConfig = this._createBaseDir()
        console.log('files are', boostrapConfig.files[0]);
        
        const tmpl = new Template()
        tmpl.getCfg()
    }

    _createBaseDir() {
        let path = this._dirPath
        if(path) {
            if(fs.existsSync(path)) {
                path += "_copy"
                console.log(`Such directory already exists`);
            } 
    
            fs.mkdirSync(path, {recursive: true})
            console.log(`We created the new project with ${path} name`);
        } else {
            console.log(`You entered empy path name: ${path}.`);
        }
    }
}