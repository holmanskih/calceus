#!/usr/cli/env node
import { buildCommand } from './commands/build.js';
import { Command } from 'commander';
import { configCommand } from './commands/config.js';
import { validateConfig } from '../config.js';
const program = new Command();

program
    .command('build')
    .alias('b')
    .description('Run build servey for module bundle and fetch')
    .action(buildCommand);

program
    .command('config')
    .alias('c')
    .description('Returns calceus configuration data')
    .action(configCommand);

program.parse(process.argv);

validateConfig()