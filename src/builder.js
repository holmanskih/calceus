import fs from 'fs'

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
        console.log(this);
        let path = this._dirPath
        if(path) {
            if(fs.existsSync(path)) {
                path += "_copy"
                console.log(`Such directory already exists. Creating the project...`);
            } 
    
            fs.mkdirSync(path, {recursive: true})
            console.log(`We created the new project with ${path} name`);
            return
        }
        console.log(`You entered empy path name: ${path}.`);
    }
}