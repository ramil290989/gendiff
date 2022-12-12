import _ from 'lodash';

const getNodesWithoutMarkers = (fileParse) => {
  const keys = _.sortBy(Object.keys(fileParse));
  return keys.map((key) => {
    if (_.isObject(fileParse[key])) {
      return { key, value: getNodesWithoutMarkers(fileParse[key]), status: 'nomod' };
    }
    return { key, value: fileParse[key], status: 'nomod' };
  });
};

export default getNodesWithoutMarkers;
