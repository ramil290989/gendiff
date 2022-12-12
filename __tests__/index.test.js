import fs from 'fs';
import genDiff from '../index.js';

test('plain hexlet json', () => {
  expect(genDiff('./__fixtures__/file1-hex.json', './__fixtures__/file2-hex.json', 'plain')).toBe(fs.readFileSync('./__fixtures__/result-plain', 'utf-8').trim());
});

test('stylish hexlet yml', () => {
  expect(genDiff('./__fixtures__/file1-hex.yml', './__fixtures__/file2-hex.yml')).toBe(fs.readFileSync('./__fixtures__/result-stylish', 'utf-8').trim());
});
