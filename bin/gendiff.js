#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the current version');

program.parse();