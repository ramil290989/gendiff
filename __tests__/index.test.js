import fs from 'fs';
import genDiff from '../index.js';

const file1JSON = './__fixtures__/file1-hex.json';
const file2JSON = './__fixtures__/file2-hex.json';
const file1YAML = './__fixtures__/file1-hex.yml';
const file2YAML = './__fixtures__/file2-hex.yml';
const stylish = fs.readFileSync('./__fixtures__/result-stylish', 'utf-8').trim();
const plain = fs.readFileSync('./__fixtures__/result-plain', 'utf-8').trim();
const json = fs.readFileSync('./__fixtures__/result-json', 'utf-8').trim();
const testArr = [
  {testName: 'json, json', file1: file1JSON, file2: file2JSON},
  {testName: 'yaml, json', file1: file1YAML, file2: file2JSON},
  {testName: 'yaml, yaml', file1: file1YAML, file2: file2YAML},
];

test.each(testArr)('genDiff($testName, stylish)', ({file1, file2}) => {
  const resultStylish = genDiff(file1, file2, 'stylish');
  expect(resultStylish).toBe(stylish);
});

test.each(testArr)('genDiff($testName, plain)', ({file1, file2}) => {
  const resultPlain = genDiff(file1, file2, 'plain');
  expect(resultPlain).toBe(plain);
});

test.each(testArr)('genDiff($testName, json)', ({file1, file2}) => {
  const resultJson = genDiff(file1, file2, 'json');
  expect(resultJson).toBe(json);
});
