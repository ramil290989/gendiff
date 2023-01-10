import fs from 'fs';
import genDiff from '../index.js';

test('format stylish fileType json vs json', () => {
  expect(genDiff('./__fixtures__/file1-hex.json', './__fixtures__/file2-hex.json')).toBe(fs.readFileSync('./__fixtures__/result-stylish', 'utf-8').trim());
});

test('format plain fileType json vs json', () => {
  expect(genDiff('./__fixtures__/file1-hex.json', './__fixtures__/file2-hex.json', 'plain')).toBe(fs.readFileSync('./__fixtures__/result-plain', 'utf-8').trim());
});

test('format json fileType json vs json', () => {
  expect(genDiff('./__fixtures__/file1-hex.json', './__fixtures__/file2-hex.json', 'json')).toBe(fs.readFileSync('./__fixtures__/result-json', 'utf-8').trim());
});

test('format json fileType yaml vs json', () => {
  expect(genDiff('./__fixtures__/file1-hex.yml', './__fixtures__/file2-hex.json', 'json')).toBe(fs.readFileSync('./__fixtures__/result-json', 'utf-8').trim());
});

test('format json fileType yaml vs yaml', () => {
  expect(genDiff('./__fixtures__/file1-hex.yml', './__fixtures__/file2-hex.yml', 'json')).toBe(fs.readFileSync('./__fixtures__/result-json', 'utf-8').trim());
});
