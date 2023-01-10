const valueToString = (value) => {
  switch (typeof value) {
    case 'object':
      return value === null ? `${value}` : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return `${value}`;
  }
};

const makeString = (diffTree, property = '') => {
  const lines = diffTree.map((item) => {
    const propertyLine = property === '' ? item.key : `${property}.${item.key}`;
    switch (item.status) {
      case 'added':
        return `Property '${propertyLine}' was added with value: ${valueToString(item.value)}`;
      case 'deleted':
        return `Property '${propertyLine}' was removed`;
      case 'changed':
        return `Property '${propertyLine}' was updated. From ${valueToString(item.oldValue)} to ${valueToString(item.newValue)}`;
      case 'nested':
        return `${makeString(item.value, propertyLine)}`;
      default:
        return '';
    }
  })
    .filter((item) => item !== '')
    .join('\n');
  return lines;
};

const plain = (diffTree) => makeString(diffTree);

export default plain;
