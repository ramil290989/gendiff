import _ from 'lodash';

const getTreeKeys = (file1Parse, file2Parse) => {
  const keysFile1 = Object.keys(file1Parse);
  const keysFile2 = Object.keys(file2Parse);
  const keys = _.sortBy([...keysFile1, ...keysFile2]);
  return keys.filter((item, index) => keys.indexOf(item) === index);
};

export default getTreeKeys;
