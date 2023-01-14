import _ from 'lodash';

const indentsCalcValues = {
  calcToNested: 4,
  calcBeforeKey: 0,
  calcBeforeNestedKey: 2,
  calcAfterValue: -2,
};

const getIndents = (indent) => ({
  toNested: indent + indentsCalcValues.calcToNested,
  beforeKey: ' '.repeat(indent + indentsCalcValues.calcBeforeKey),
  beforeNestedKey: ' '.repeat(indent + indentsCalcValues.calcBeforeNestedKey),
  afterValue: ' '.repeat(indent + indentsCalcValues.calcAfterValue),
});

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

const valueToString = (itemValue, indentValue) => {
  const indents = getIndents(indentValue);
  if (_.isObject(itemValue)) {
    const keys = Object.keys(itemValue);
    const nestedLine = keys.map((key) => {
      const value = valueToString(itemValue[key], indents.toNested);
      return `${indents.beforeNestedKey}${key}: ${value}`;
    })
      .join('\n');
    return `{\n${nestedLine}\n${indents.afterValue}}`;
  }
  return itemValue;
};

const makeString = (diffTree, indentValue = 2) => {
  const indents = getIndents(indentValue);
  const lines = diffTree.map((item) => {
    switch (item.status) {
      case 'nomod':
      case 'added':
      case 'deleted': {
        const operator = getOperator(item.status);
        const value = valueToString(item.value, indents.toNested);
        return `${indents.beforeKey}${operator} ${item.key}: ${value}`;
      }
      case 'nested': {
        const value = makeString(item.value, indents.toNested);
        return `${indents.beforeKey}  ${item.key}: ${value}`;
      }
      case 'changed': {
        const oldValue = valueToString(item.oldValue, indents.toNested);
        const newValue = valueToString(item.newValue, indents.toNested);
        return `${indents.beforeKey}- ${item.key}: ${oldValue}\n${indents.beforeKey}+ ${item.key}: ${newValue}`;
      }
      default:
        throw new Error('неверный статус');
    }
  }).join('\n');
  return `{\n${lines}\n${indents.afterValue}}`;
};

const stylish = (diffTree) => makeString(diffTree);

export default stylish;
