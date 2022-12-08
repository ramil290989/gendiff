import getTreeKeys from './getTreeKeys.js';
import getNodesWithoutMarkers from './getNodesWithoutMarkers.js';

const getNodesWithMarkers = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const nodesWithMarkers = keys.reduce((node, key) => {
    const nodeItem = {};
    if (Object.keys(file1Parse).includes(key)) {
      if (Object.keys(file2Parse).includes(key)) {
        if (typeof file1Parse[key] !== 'object' && typeof file2Parse[key] !== 'object') {
          if (file1Parse[key] === file2Parse[key]) {
            nodeItem.key = key;
            nodeItem.value = file1Parse[key];
            nodeItem.status = 'nomod';
            node.push(nodeItem);
            return node;
          } else {
            nodeItem.key = key;
            nodeItem.value = file1Parse[key];
            nodeItem.status = 'changed_from';
            node.push(nodeItem);
            const nodeItemChangeTo = {};
            nodeItemChangeTo.key = key;
            nodeItemChangeTo.value = file2Parse[key];
            nodeItemChangeTo.status = 'changed_to';
            node.push(nodeItemChangeTo);
            return node;
          }
        } else if (typeof file1Parse[key] === 'object' && typeof file2Parse[key] !== 'object') {
          if (file1Parse[key] === null) {
            nodeItem.key = key;
            nodeItem.value = file1Parse[key];
            nodeItem.status = 'changed_from';
            node.push(nodeItem);
          } else {
            nodeItem.key = key;
            nodeItem.value = getNodesWithoutMarkers(file1Parse[key], 0);
            nodeItem.status = 'changed_from';
            node.push(nodeItem);
          }
          const nodeItemChangeTo = {};
          nodeItemChangeTo.key = key;
          nodeItemChangeTo.value = file2Parse[key];
          nodeItemChangeTo.status = 'changed_to';
          node.push(nodeItemChangeTo);
          return node;
        } else if (typeof file1Parse[key] !== 'object' && typeof file2Parse[key] === 'object') {
          nodeItem.key = key;
          nodeItem.value = file1Parse[key];
          nodeItem.status = 'changed_from';
          node.push(nodeItem);
          if (file2Parse[key] === null) {
            const nodeItemChangeTo = {};
            nodeItemChangeTo.key = key;
            nodeItemChangeTo.value = file2Parse[key];
            nodeItemChangeTo.status = 'changed_to';
            node.push(nodeItemChangeTo);
            return node;
          } else {
            const nodeItemChangeTo = {};
            nodeItemChangeTo.key = key;
            nodeItemChangeTo.value = getNodesWithoutMarkers(0, file2Parse[key]);
            nodeItemChangeTo.status = 'changed_to';
            node.push(nodeItemChangeTo);
            return node;
          }
        } else {
          nodeItem.key = key;
          nodeItem.value = getNodesWithMarkers(file1Parse[key], file2Parse[key]);
          nodeItem.status = 'nomod';
          node.push(nodeItem);
          return node;
        }
      } 
      if (typeof file1Parse[key] !== 'object') {
        nodeItem.key = key;
        nodeItem.value = file1Parse[key];
        nodeItem.status = 'deleted';
        node.push(nodeItem);
        return node;
      } else {
        nodeItem.key = key;
        nodeItem.value = getNodesWithoutMarkers(file1Parse[key], 0);
        nodeItem.status = 'deleted';
        node.push(nodeItem);
        return node;
      }
    }
    if (typeof file1Parse[key] !== 'object' && typeof file2Parse[key] !== 'object') {
      nodeItem.key = key;
      nodeItem.value = file2Parse[key];
      nodeItem.status = 'added';
      node.push(nodeItem);
      return node;
    } else {				
      nodeItem.key = key;
      nodeItem.value = getNodesWithoutMarkers(0, file2Parse[key]);
      nodeItem.status = 'added';
      node.push(nodeItem);
      return node;
    }
  }, []);
  return nodesWithMarkers;
};

export default getNodesWithMarkers;
