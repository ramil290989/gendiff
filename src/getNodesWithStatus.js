import _ from 'lodash';
import getTreeKeys from './getTreeKeys.js';

const getNodesWithStatus = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const nodesWithStatus = keys.map((key) => {
    if (!_.has(file2Parse, key)) {
      return { key, value: file1Parse[key], status: 'deleted' };
    }
    if (!_.has(file1Parse, key)) {
      return { key, value: file2Parse[key], status: 'added' };
    }
    if (file1Parse[key] === file2Parse[key]) {
      return { key, value: file1Parse[key], status: 'nomod' };
    }
    if (_.isObject(file1Parse[key]) && _.isObject(file2Parse[key])) {
      return [{ key, value: getNodesWithStatus(file1Parse[key], file2Parse[key]), status: 'nested' }];
    }
    return {
      key,
      oldValue: file1Parse[key],
      newValue: file2Parse[key],
      status: 'changed',
    };
  });
  return nodesWithStatus.flat();
};

export default getNodesWithStatus;
