import inquirer from 'inquirer'
import {cfg, RunMode} from '../../../config.js'
import {Schema} from "../../schema.js";
import {Bootstraper} from "../../bootstraper.js";
import {CliOpts} from "../opts.js";
import {CliOpt} from "./build.js";

export const cliParams = [
    {
        type: 'input',
        name: CliOpt.ProjectName,
        message: "Enter the new project name",
        default: "."
    },
    {
        type: 'rawlist',
        name: CliOpt.Modules,
        message: 'Choose project architecture to boostrap new project',
        choices: ['react', 'vue'],
    },
]

export const buildAutoCommand = () => {
    inquirer
        .prompt<CliOpts>(cliParams)
        .then((cliOpts) => {
            cliOpts.dirPath = process.cwd()
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