import inquirer from 'inquirer'
import {App} from '../src/app.js'
import {appConfig, RunMode} from '../config/config.js'
import {getModulesPath} from "../constants.js"

export const configCommand = () => {
    const modulesPath = getModulesPath()
    console.log(`modules path: ${modulesPath}`);
}
