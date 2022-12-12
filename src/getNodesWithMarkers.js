import _ from 'lodash';
import getTreeKeys from './getTreeKeys.js';
import getNodesWithoutMarkers from './getNodesWithoutMarkers.js';

const getNodesWithMarkers = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const nodesWithMarkers = keys.map((key) => {
    if (Object.keys(file1Parse).includes(key)) {
      if (Object.keys(file2Parse).includes(key)) {
        if (!_.isObject(file1Parse[key]) && !_.isObject(file2Parse[key])) {
          if (file1Parse[key] === file2Parse[key]) {
            return { key, value: file1Parse[key], status: 'nomod' };
          }
          return {
            key,
            oldValue: file1Parse[key],
            newValue: file2Parse[key],
            status: 'changed',
          };
        }
        if (_.isObject(file1Parse[key]) && !_.isObject(file2Parse[key])) {
          return {
            key,
            oldValue: getNodesWithoutMarkers(file1Parse[key]),
            newValue: file2Parse[key],
            status: 'changed',
          };
        }
        if (!_.isObject(file1Parse[key]) && _.isObject(file2Parse[key])) {
          return {
            key,
            oldValue: file1Parse[key],
            newValue: getNodesWithoutMarkers(file2Parse[key]),
            status: 'changed',
          };
        }
        return { key, value: getNodesWithMarkers(file1Parse[key], file2Parse[key]), status: 'nomod' };
      }
      if (!_.isObject(file1Parse[key])) {
        return { key, value: file1Parse[key], status: 'deleted' };
      }
      return { key, value: getNodesWithoutMarkers(file1Parse[key]), status: 'deleted' };
    }
    if (!_.isObject(file1Parse[key]) && !_.isObject(file2Parse[key])) {
      return { key, value: file2Parse[key], status: 'added' };
    }
    return { key, value: getNodesWithoutMarkers(file2Parse[key]), status: 'added' };
  });
  return nodesWithMarkers.flat();
};

export default getNodesWithMarkers;
