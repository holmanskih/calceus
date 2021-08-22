import inquirer from 'inquirer'
import fs from 'fs'

const dirPath = 'dirPath'
const modules = 'modules'
const projectName = 'projectName'

class Builder {
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

const modulesOptions = [
    {
        type: 'input',
        name: dirPath,
        message: "Enter the new project path",
    },
    {
        type: 'input',
        name: projectName,
        message: "Enter the new project name",
    },
    {
        type: 'rawlist',
        name: modules,
        message: 'Choose modules is needed to install',
        choices: ['Webpack', 'SASS'],
    },
]

export function buildCmd() {
    inquirer
        .prompt(modulesOptions)
        .then((answers) => {
            let builder = new Builder(answers)
            builder.bootstrap()
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(`Prompt couldn't be rendered in the current environment: ${error}`);
            } else {
                console.log(`Unexpected error: ${error}`);
            }
        });
}
