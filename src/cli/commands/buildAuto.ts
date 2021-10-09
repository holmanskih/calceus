import inquirer from 'inquirer'
import {cfg, RunMode} from '../../../config.js'
import {Schema} from "../../schema.js";
import {Bootstraper} from "../../bootstraper.js";
import {CliOpts} from "../opts.js";
import {CliOpt} from "./build.js";
import {CWD_PATH_DELIMITER} from "../../../constants.js";
import path from "path";

export const cliParams = [
    {
        type: 'input',
        name: CliOpt.ProjectName,
        message: "Enter the new project name",
        default: CWD_PATH_DELIMITER
    },
    {
        type: 'rawlist',
        name: CliOpt.Modules,
        message: 'Choose project architecture to boostrap new project',
        choices: ['default'],
    },
]

export const buildAutoCommand = () => {
    inquirer
        .prompt<CliOpts>(cliParams)
        .then((cliOpts) => {
            cliOpts.dirPath = process.cwd()
            if(cliOpts.projectName == CWD_PATH_DELIMITER) {
                cliOpts.projectName = ""
            } else {
                cliOpts.dirPath = path.join(cliOpts.dirPath, cliOpts.projectName)
            }
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