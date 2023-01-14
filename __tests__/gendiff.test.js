import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

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
  const file1 = path.resolve(`./__fixtures__/file1-hex.${file1Type}`);
  const file2 = path.resolve(`./__fixtures__/file2-hex.${file2Type}`);
  const result = genDiff(file1, file2, format);
  expect(result).toBe(fs.readFileSync(path.resolve(`./__fixtures__/result-${format}`), 'utf-8').trim());
});
