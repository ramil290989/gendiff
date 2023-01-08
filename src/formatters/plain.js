const getValue = (value) => {
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
  const result = diffTree.map((item) => {
    const propertyLine = `${property}.${item.key}`[0] === '.' ? `${property}.${item.key}`.slice(1) : `${property}.${item.key}`;
    if (Array.isArray(item.value) && item.status === 'nested') {
      return `${makeString(item.value, propertyLine)}`;
    }
    switch (item.status) {
      case 'added':
        return `Property '${propertyLine}' was added with value: ${getValue(item.value)}`;
      case 'deleted':
        return `Property '${propertyLine}' was removed`;
      case 'changed':
        return `Property '${propertyLine}' was updated. From ${getValue(item.oldValue)} to ${getValue(item.newValue)}`;
      default:
        return '';
    }
  })
    .filter((item) => item !== '')
    .join('\n');
  return result;
};

const plain = (diffTree) => makeString(diffTree);

export default plain;
