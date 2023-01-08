import _ from 'lodash';

const valueToString = (itemValue, count) => {
  if (Array.isArray(itemValue)) {
    return makeString(itemValue, count);
  }
  if (_.isObject(itemValue)) {
    count += 4;
    const result = Object.keys(itemValue).map((key) => {
      return `${' '.repeat(count - 2)}${key}: ${valueToString(itemValue[key], count)}`;
    }).join('\n');
    return `{\n${result}\n${' '.repeat(count - 6)}}`;
  }
  return itemValue;
};

const makeString = (diffTree, rep = 2) => {
  const count = rep + 4;
  const lines = diffTree.map((item) => {
    const resultValue = valueToString(item.value, count);
    const resultOldValue = valueToString(item.oldValue, count);
    const resultNewValue = valueToString(item.newValue, count);
    switch (item.status) {
      case 'nomod':
        return `${' '.repeat(rep)}  ${item.key}: ${resultValue}`;
      case 'changed':
        return `${' '.repeat(rep)}- ${item.key}: ${resultOldValue}\n${' '.repeat(rep)}+ ${item.key}: ${resultNewValue}`;
      case 'deleted':
        return `${' '.repeat(rep)}- ${item.key}: ${resultValue}`;
      case 'added':
        return `${' '.repeat(rep)}+ ${item.key}: ${resultValue}`;
      case 'nested':
        return `${' '.repeat(rep)}  ${item.key}: ${resultValue}`; 
      default:
        throw new Error('неверный статус');;
    }
  }).join('\n');
  const result = `{\n${lines}\n${' '.repeat(rep - 2)}}`;
  return result;
};

const stylish = (diffTree) => makeString(diffTree);

export default stylish;
