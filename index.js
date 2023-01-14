import fs from 'fs';
import path from 'path';
import buildTree from './src/buildTree.js';
import parser from './src/parser.js';
import treeFormatter from './src/treeFormatter.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const pathToFile1 = path.resolve(file1);
  const pathToFile2 = path.resolve(file2);
  const file1Content = fs.readFileSync(pathToFile1, 'utf-8');
  const file2Content = fs.readFileSync(pathToFile2, 'utf-8');
  const file1Type = path.extname(pathToFile1).slice(1);
  const file2Type = path.extname(pathToFile2).slice(1);
  const file1Parse = parser(file1Content, file1Type);
  const file2Parse = parser(file2Content, file2Type);
  const diffTree = buildTree(file1Parse, file2Parse);
  return treeFormatter(diffTree, format);
};

export default genDiff;
