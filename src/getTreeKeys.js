import _ from 'lodash';

const getTreeKeys = (file1Parse, file2Parse) => {
  const keysFile1 = Object.keys(file1Parse);
  const keysFile2 = Object.keys(file2Parse);
  const keys = _.sortBy([...keysFile1, ...keysFile2]);
  return _.uniq(keys);
};

export default getTreeKeys;
