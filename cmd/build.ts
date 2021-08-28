import inquirer from 'inquirer'
import {Builder, dirPath, modules, projectName} from '../src/builder.js'
import {appConfig} from '../config/config.js'
import shell from 'shelljs'

const modulesOptions = [
    {
        type: 'input',
        name: dirPath,
        message: "Enter the new project path",
        default: appConfig.mode == "debug" ? `./test_data/example_project_${new Date().valueOf()}` : "example_project"
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
        message: 'Choose modules is needed to install',
        choices: ['Webpack', 'SASS'],
    },
]

export const buildCmd = () => {
    // console.log('touch directory');
    // shell.mkdir('-p', './test23/somethind/more')
    // shell.touch('./test23/somethind/more/index.html')

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
