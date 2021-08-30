import inquirer from 'inquirer'
import {App} from '../src/app.js'
import {appConfig, RunMode} from '../config/config.js'
import shell from 'shelljs'
import { Bootstraper } from '../src/bootstraper.js'

export const dirPath = 'dirPath'
export const modules = 'modules'
export const projectName = 'projectName'

const modulesOptions = [
    {
        type: 'input',
        name: dirPath,
        message: "Enter the new project path",
        default: appConfig.mode == RunMode.Debug ? `./test_data/example_project_${new Date().valueOf()}` : "example_project"
    },
    {
        type: 'input',
        name: projectName,
        message: "Enter the new project name",
        default: "example"
    },
    {
        type: 'rawlist',
        name: modules,
        message: 'Choose project architecture to boostrap new project',
        choices: ['react', 'vue'],
    },
]

export const buildCmd = () => {
    inquirer
        .prompt(modulesOptions)
        .then((answers) => {
            let builder = new App(answers)
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
