import getTreeKeys from './getTreeKeys.js';
import getNodesWithoutMarkers from './getNodesWithoutMarkers.js';

const getNodesWithMarkers = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const nodesWithMarkers = keys.map((key) => {
    if (Object.keys(file1Parse).includes(key)) {
      if (Object.keys(file2Parse).includes(key)) {
        if (typeof file1Parse[key] !== 'object' && typeof file2Parse[key] !== 'object') {
          if (file1Parse[key] === file2Parse[key]) {
            return { key, value: file1Parse[key], status: 'nomod' };
          } else {
            return [
              { key, value: file1Parse[key], status: 'changed_from' },
              { key, value: file2Parse[key], status: 'changed_to' }
            ];
          }
        } else if (typeof file1Parse[key] === 'object' && typeof file2Parse[key] !== 'object') {
          if (file1Parse[key] === null) {
            return [
              { key, value: file1Parse[key], status: 'changed_from' },
              { key, value: file2Parse[key], status: 'changed_to' }
            ];
          } else {
            return [
              { key, value: getNodesWithoutMarkers(file1Parse[key], 0), status: 'changed_from' },
              { key, value: file2Parse[key], status: 'changed_to' }
            ];
          }
        } else if (typeof file1Parse[key] !== 'object' && typeof file2Parse[key] === 'object') {
          if (file2Parse[key] === null) {
            return [
              { key, value: file1Parse[key], status: 'changed_from' },
              { key, value: file2Parse[key], status: 'changed_to' }
            ];
          } else {
            return [
              { key, value: file1Parse[key], status: 'changed_from' },
              { key, value: getNodesWithoutMarkers(0, file2Parse[key]), status: 'changed_to' }
            ];
          }
        } else {
          return { key, value: getNodesWithMarkers(file1Parse[key], file2Parse[key]), status: 'nomod' };
        }
      } 
      if (typeof file1Parse[key] !== 'object') {
        return { key, value: file1Parse[key], status: 'deleted' };
      } else {
        return { key, value: getNodesWithoutMarkers(file1Parse[key], 0), status: 'deleted' };
      }
    }
    if (typeof file1Parse[key] !== 'object' && typeof file2Parse[key] !== 'object') {
      return { key, value: file2Parse[key], status: 'added' };
    } else {
      return { key, value: getNodesWithoutMarkers(0, file2Parse[key]), status: 'added' };
    }
  });
  return nodesWithMarkers.flat();
};

export default getNodesWithMarkers;
