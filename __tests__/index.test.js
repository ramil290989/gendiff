import fs from 'fs';
import genDiff from '../index.js';

const file1JSON = './__fixtures__/file1-hex.json';
const file2JSON = './__fixtures__/file2-hex.json';
const file1YAML = './__fixtures__/file1-hex.yml';
const file2YAML = './__fixtures__/file2-hex.yml';
const stylish = fs.readFileSync('./__fixtures__/result-stylish', 'utf-8').trim();
const plain = fs.readFileSync('./__fixtures__/result-plain', 'utf-8').trim();
const json = fs.readFileSync('./__fixtures__/result-json', 'utf-8').trim();

const toTest1 = [
  [file1JSON, file2JSON, 'stylish'],
  [file1JSON, file2YAML, 'stylish'],
  [file1YAML, file2YAML, 'stylish'],
];

const toTest2 = [
  [file1JSON, file2JSON, 'plain'],
  [file1JSON, file2YAML, 'plain'],
  [file1YAML, file2YAML, 'plain'],
];

const toTest3 = [
  [file1JSON, file2JSON, 'json'],
  [file1JSON, file2YAML, 'json'],
  [file1YAML, file2YAML, 'json'],
];

describe('Test stylis', () => {
  test.each(toTest1)(`stylish`, (...params) => {
    expect(genDiff(...params)).toEqual(stylish);
  });
});

describe('Test plain', () => {
  test.each(toTest2)(`plain`, (...params) => {
    expect(genDiff(...params)).toEqual(plain);
  });
});

describe('Test json', () => {
  test.each(toTest3)(`json`, (...params) => {
    expect(genDiff(...params)).toEqual(json);
  });
});