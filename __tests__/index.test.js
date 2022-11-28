import genDiff from '../src/index.js';

test('gendiff json-json', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(`{            
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff yaml-yaml', () => {
  expect(genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yml')).toBe(`{            
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('gendiff json-yaml', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.yml')).toBe(`{            
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});