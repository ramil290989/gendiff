import getFileType from './src/getFileType.js';
import genDiffTree from './src/genDiffTree.js';
import parser from './src/parser.js';
import getOutFormat from './src/getOutFormat.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const file1Parse = parser(file1, getFileType(file1));
  const file2Parse = parser(file2, getFileType(file2));
  const diffTree = genDiffTree(file1Parse, file2Parse);
  return getOutFormat(diffTree, format);
};

export default genDiff;
