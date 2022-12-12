import _ from 'lodash';

const getNodesWithoutMarkers = (fileParse) => {
  const keys = _.sortBy(Object.keys(fileParse));
  return keys.map((key) =>
    _.isObject(fileParse[key])
      ? { key, value: getNodesWithoutMarkers(fileParse[key]), status: 'nomod' }
      : { key, value: fileParse[key], status: 'nomod' }
  );
};

export default getNodesWithoutMarkers;
