import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filepath) => fs.readFileSync(filepath, 'utf-8');

const testArr = [
  {
    format: 'stylish',
    file1Type: 'json',
    file2Type: 'json',
  },
  {
    format: 'plain',
    file1Type: 'yml',
    file2Type: 'json',
  },
  {
    format: 'json',
    file1Type: 'yml',
    file2Type: 'yml',
  },
];

test.each(testArr)('genDiff($file1Type, $file2Type, $format)', ({ file1Type, file2Type, format }) => {
  const filepath1 = getFixturePath(`file1-hex.${file1Type}`);
  const filepath2 = getFixturePath(`file2-hex.${file2Type}`);
  const resultFilepath = getFixturePath(`result-${format}`);
  const result = genDiff(filepath1, filepath2, format);
  expect(result).toBe(readFixture(resultFilepath).trim());
});
