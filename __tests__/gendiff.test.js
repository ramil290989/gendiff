import fs from 'fs';
import genDiff from '../index.js';

const getFile = (path, fileName) => `${path}${fileName}`;

const getResultFile = (path, fileName) => fs.readFileSync(getFile(path, fileName), 'utf-8').trim();

const testArr = [
  {
    testName: 'json, json',
    format: 'stylish',
    file1: getFile('./__fixtures__/', 'file1-hex.json'),
    file2: getFile('./__fixtures__/', 'file2-hex.json'),
  },
  {
    testName: 'yaml, json',
    format: 'plain',
    file1: getFile('./__fixtures__/', 'file1-hex.yml'),
    file2: getFile('./__fixtures__/', 'file2-hex.json'),
  },
  {
    testName: 'yaml, yaml',
    format: 'json',
    file1: getFile('./__fixtures__/', 'file1-hex.yml'),
    file2: getFile('./__fixtures__/', 'file2-hex.yml'),
  },
];

test.each(testArr)('genDiff($testName, $format)', ({ file1, file2, format }) => {
  const result = genDiff(file1, file2, format);
  expect(result).toBe(getResultFile('./__fixtures__/', `result-${format}`));
});
