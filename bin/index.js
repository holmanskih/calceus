#!/usr/bin/env node
import program from 'commander'
import { buildCmd } from '../cmd/build.js';

program
    .command('build')
    .alias('b')
    .description('Run build servey for module bundle and fetch')
    .action(buildCmd);

program.parse(process.argv);