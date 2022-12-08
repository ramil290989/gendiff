import genDiffTree from './src/genDiffTree.js'
import parser from './src/parser.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';

const genDiff = (file1, file2, format = 'stylish') => {
  let file1Parse = parser(file1);
  let file2Parse = parser(file2);
  let result = genDiffTree(file1Parse, file2Parse);
  switch (format) {
    case 'stylish':
      return stylish(result);
		case 'plain':
			return plain(result);
		case 'json':
			return json(result);
		default:
			return stylish(result);
  }
};

export default genDiff;

