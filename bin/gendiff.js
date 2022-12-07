#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .version('1.0.0', '-v, --version', 'output the current version')
  .arguments('<file1> <file2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format: stylish, plain, json', 'stylish')
  .action((file1, file2) => (
    console.log(genDiff(file1, file2, program.format))))
  .parse(process.argv);