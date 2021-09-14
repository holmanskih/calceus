import inquirer from 'inquirer'
import {cfg, RunMode} from '../../config.js'
import {CliOpts} from "../opts.js";
import {Schema} from "../../src/schema.js";
import {Bootstraper} from "../../src/bootstraper.js";

export enum CliOpt {
    DirPath = "dirPath",
    Modules = "modules",
    ProjectName = "projectName"
}

const modulesOptions = [
    {
        type: 'input',
        name: CliOpt.DirPath,
        message: "Enter the new project path",
        default: cfg.mode === RunMode.Debug ? `./test_data/example_project_${new Date().valueOf()}` : "example_project"
    },
    {
        type: 'input',
        name: CliOpt.ProjectName,
        message: "Enter the new project name",
        default: "example"
    },
    {
        type: 'rawlist',
        name: CliOpt.Modules,
        message: 'Choose project architecture to boostrap new project',
        choices: ['react', 'vue'],
    },
]

export const buildCommand = () => {
    inquirer
        .prompt<CliOpts>(modulesOptions)
        .then((cliOpts) => {
            const schemaModel = Schema.parseFromConfig(cfg.schemaConfigurationPath)
            const bootstrapper = new Bootstraper(cliOpts, schemaModel)
            bootstrapper.bootstrap()
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(`Prompt couldn't be rendered in the current environment: ${error}`);
            } else {
                console.log(`Unexpected error: ${error}`);
            }
        });
}
