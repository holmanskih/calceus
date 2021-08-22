#!/usr/bin/env node
const program = require('commander');
const build = require('../cmd/build');

program
    .command('build')
    .alias('b')
    .description('Run build servey for module bundle and fetch')
    .action(build);

program.parse(process.argv);