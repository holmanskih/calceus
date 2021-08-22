#!/usr/bin/env node
import { buildCmd } from '../cmd/build.js';
import { Command } from 'commander';
const program = new Command();
program
    .command('build')
    .alias('b')
    .description('Run build servey for module bundle and fetch')
    .action(buildCmd);
program.parse(process.argv);
