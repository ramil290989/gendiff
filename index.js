import fs from 'fs';
import path from 'path';
import buildTree from './src/buildTree.js';
import parser from './src/parser.js';
import treeFormatter from './src/treeFormatter.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const file1Content = fs.readFileSync(file1, 'utf-8');
  const file2Content = fs.readFileSync(file2, 'utf-8');
  const file1Type = path.extname(file1).slice(1);
  const file2Type = path.extname(file2).slice(1);
  const file1Parse = parser(file1Content, file1Type);
  const file2Parse = parser(file2Content, file2Type);
  const diffTree = buildTree(file1Parse, file2Parse);
  return treeFormatter(diffTree, format);
};

export default genDiff;
