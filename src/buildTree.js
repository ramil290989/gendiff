import _ from 'lodash';
import getTreeKeys from './getTreeKeys.js';

const buildTree = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const diffTree = keys.map((key) => {
    if (_.isObject(file1Parse[key]) && _.isObject(file2Parse[key])) {
      return { key, value: buildTree(file1Parse[key], file2Parse[key]), status: 'nested' };
    }
    if (!_.has(file2Parse, key)) {
      return { key, value: file1Parse[key], status: 'deleted' };
    }
    if (!_.has(file1Parse, key)) {
      return { key, value: file2Parse[key], status: 'added' };
    }
    if (file1Parse[key] !== file2Parse[key]) {
      return { key, oldValue: file1Parse[key], newValue: file2Parse[key], status: 'changed' };
    }
    return { key, value: file1Parse[key], status: 'nomod' };
  });
  return diffTree;
};

export default buildTree;
