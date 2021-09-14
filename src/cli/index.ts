#!/usr/cli/env node
import { buildCommand } from './commands/build.js';
import { Command } from 'commander';
import { configCommand } from './commands/config.js';
import { validateConfig } from '../../config.js';
import {defaultBuildCommand} from "./commands/defaultBuild.js";

const program = new Command();

program
    .command('build')
    .alias('b')
    .description('bootstrap new project in extendable mode')
    .action(buildCommand);

program
    .command('default')
    .alias('d')
    .description('bootstrap new project in auto mode')
    .action(defaultBuildCommand);

program
    .command('config')
    .alias('c')
    .description('show configuration for calceus')
    .action(configCommand);

export const run = () => {
    program.parse(process.argv)
    validateConfig()
}