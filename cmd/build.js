const inquirer = require('inquirer');
const fs = require('fs');

module.exports = function () {

    class Builder {
        constructor() {
            this._dirPath = ''
            this._modules = ''
        }

        parse(data) {
            this._dirPath = data['dirPath']
            this._modules = data['modules']
        }

        getModules() {
            return this._modules
        }

        getDirPath() {
            return this._dirPath
        }

        bootstrap() {
            fs.mkdirSync('./delete23')
        }
    }

    const modulesOptions = [
        {
            type: 'input',
            name: 'dirPath',
            message: "Enter the new project path",
        },
        {
            type: 'rawlist',
            name: 'modules',
            message: 'Choose modules is needed to install',
            choices: ['Webpack', 'SASS'],
        },
    ]

    inquirer
        .prompt(modulesOptions)
        .then((answers) => {
            let builder = new Builder()
            builder.parse(answers)
            console.log(`builder modules ${builder.getDirPath()}`);
            builder.bootstrap()
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(`Prompt couldn't be rendered in the current environment: ${error}`);
            } else {
                console.log(`Unexpected error: ${error}`);
            }
        });
};