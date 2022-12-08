import getTreeKeys from './getTreeKeys.js';

const getNodesWithoutMarkers = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const nodesWithoutMarkers = keys.map((key) => {
    if (typeof file2Parse[key] !== 'object' && typeof file1Parse[key] !== 'object') {
      if (file2Parse === 0) {
        return { key: key, value: file1Parse[key], status: 'nomod' };
      } else {
        return { key: key, value: file2Parse[key], status: 'nomod' };
      }
    } else {
      if (file2Parse === 0) {
        return { key: key, value: getNodesWithoutMarkers(file1Parse[key], 0), status: 'nomod' };
      } else {
        return { key: key, value: getNodesWithoutMarkers(0, file2Parse[key]), status: 'nomod' };
      }
    }
  });
  return nodesWithoutMarkers;
};

export default getNodesWithoutMarkers;
