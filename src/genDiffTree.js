import getTreeKeys from './getTreeKeys.js';
import getNodesWithMarkers from './getNodesWithMarkers.js';

const genDiffTree = (file1Parse, file2Parse) => getNodesWithMarkers(file1Parse, file2Parse);

export default genDiffTree;
