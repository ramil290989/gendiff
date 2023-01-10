import _ from 'lodash';

const valueToString = (itemValue, repeatValue) => {
  const repeatBeforeKey = repeatValue + 2;
  const repeatForNested = repeatValue + 4;
  const repeatAfterValue = repeatValue - 2;
  if (_.isObject(itemValue)) {
    const nestedLine = Object.keys(itemValue).map((key) => `${' '.repeat(repeatBeforeKey)}${key}: ${valueToString(itemValue[key], repeatForNested)}`)
      .join('\n');
    return `{\n${nestedLine}\n${' '.repeat(repeatAfterValue)}}`;
  }
  return itemValue;
};

const makeString = (diffTree, repeatValue = 2) => {
  const repeatBeforeKey = repeatValue;
  const repeatForNested = repeatValue + 4;
  const repeatAfterValue = repeatValue - 2;
  const lines = diffTree.map((item) => {
    switch (item.status) {
      case 'nomod':
        return `${' '.repeat(repeatBeforeKey)}  ${item.key}: ${valueToString(item.value, repeatForNested)}`;
      case 'changed':
        return `${' '.repeat(repeatBeforeKey)}- ${item.key}: ${valueToString(item.oldValue, repeatForNested)}\n${' '.repeat(repeatBeforeKey)}+ ${item.key}: ${valueToString(item.newValue, repeatForNested)}`;
      case 'deleted':
        return `${' '.repeat(repeatBeforeKey)}- ${item.key}: ${valueToString(item.value, repeatForNested)}`;
      case 'added':
        return `${' '.repeat(repeatBeforeKey)}+ ${item.key}: ${valueToString(item.value, repeatForNested)}`;
      case 'nested':
        return `${' '.repeat(repeatBeforeKey)}  ${item.key}: ${makeString(item.value, repeatForNested)}`;
      default:
        throw new Error('неверный статус');
    }
  })
    .join('\n');
  return `{\n${lines}\n${' '.repeat(repeatAfterValue)}}`;
};

const stylish = (diffTree) => makeString(diffTree);

export default stylish;
