import inquirer from 'inquirer'
import {Builder, dirPath, modules, projectName} from '../src/builder.js'

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
