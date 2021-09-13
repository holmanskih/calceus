#!/usr/bin/env node
import { buildCmd } from '../cmd/build.js';
import { Command } from 'commander';
import { configCommand } from '../cmd/config.js';
import { validateConfig } from '../config/config.js';
const program = new Command();

program
    .command('build')
    .alias('b')
    .description('Run build servey for module bundle and fetch')
    .action(buildCmd);

program
    .command('config')
    .alias('c')
    .description('Returns calceus configuration data')
    .action(configCommand);

program.parse(process.argv);

validateConfig()