import _ from 'lodash';

const spacesToNested = 4;

const getSpaces = (spaceCount, to) => {
  const beforeKey = 0;
  const beforeNestedKey = 2;
  const afterValue = -2;
  switch (to) {
    case 'beforeKey':
      return ' '.repeat(spaceCount + beforeKey);
    case 'beforeNestedKey':
      return ' '.repeat(spaceCount + beforeNestedKey);
    case 'afterValue':
      return ' '.repeat(spaceCount + afterValue);
    default:
      throw new Error('неверное значение для функции');
  };
}

const getOperator = (status) => {
  switch (status) {
    case 'nomod':
      return ' ';
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    default:
      throw new Error('неверный статус');
  }
};

const valueToString = (itemValue, spaceCount) => {
  const nestedSpaceCount = spaceCount + spacesToNested;
  if (_.isObject(itemValue)) {
    const keys = Object.keys(itemValue);
    const nestedLine = keys.map((key) => {
      const value = valueToString(itemValue[key], nestedSpaceCount);
      return `${getSpaces(spaceCount, 'beforeNestedKey')}${key}: ${value}`;
    })
      .join('\n');
    return `{\n${nestedLine}\n${getSpaces(spaceCount, 'afterValue')}}`;
  }
  return itemValue;
};

const makeString = (diffTree, spaceCount = 2) => {
  const lines = diffTree.map((item) => {
    const spiceBeforeKey = getSpaces(spaceCount, 'beforeKey');
    const key = item.key;
    const nestedSpaceCount = spaceCount + spacesToNested;
    switch (item.status) {
      case 'nomod':
      case 'added':
      case 'deleted':
        const operator = getOperator(item.status);
        const value = valueToString(item.value, nestedSpaceCount);
        return `${spiceBeforeKey}${operator} ${key}: ${value}`;
      case 'nested':
        const nestedValue = makeString(item.value, nestedSpaceCount)
        return `${spiceBeforeKey}  ${key}: ${nestedValue}`;
      case 'changed':
        const oldValue = valueToString(item.oldValue, nestedSpaceCount);
        const newValue = valueToString(item.newValue, nestedSpaceCount);
        return `${spiceBeforeKey}- ${key}: ${oldValue}\n${spiceBeforeKey}+ ${key}: ${newValue}`;
      default:
        throw new Error('неверный статус');
    }
  })
    .join('\n');
  return `{\n${lines}\n${getSpaces(spaceCount, 'afterValue')}}`;
};

const stylish = (diffTree) => makeString(diffTree);

export default stylish;
