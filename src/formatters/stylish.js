import _ from 'lodash';

const valueToString = (itemValue, count) => {
  const repCount = count + 4;
  if (_.isObject(itemValue)) {
    const result = Object.keys(itemValue).map((key) => `${' '.repeat(repCount - 2)}${key}: ${valueToString(itemValue[key], repCount)}`).join('\n');
    return `{\n${result}\n${' '.repeat(repCount - 6)}}`;
  }
  return itemValue;
};

const makeString = (diffTree, rep = 2) => {
  const count = rep + 4;
  const lines = diffTree.map((item) => {
    const resultValue = Array.isArray(item.value)
      ? makeString(item.value, count)
      : valueToString(item.value, count);
    const resultOldValue = Array.isArray(item.oldValue)
      ? makeString(item.oldValue, count)
      : valueToString(item.oldValue, count);
    const resultNewValue = Array.isArray(item.newValue)
      ? makeString(item.newValue, count)
      : valueToString(item.newValue, count);
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
        throw new Error('неверный статус');
    }
  }).join('\n');
  const result = `{\n${lines}\n${' '.repeat(rep - 2)}}`;
  return result;
};

const stylish = (diffTree) => makeString(diffTree);

export default stylish;
