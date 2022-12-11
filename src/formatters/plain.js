const getProperty = (property, key) => {
  if (`${property}.${key}`[0] === '.') {
    return `${property}.${key}`.slice(1);
  }
  return `${property}.${key}`;
};

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
  const string = diffTree.map((item, index) => {
    if (Array.isArray(item.value) && item.status === 'nomod') {
      const propertyRecursion = getProperty(property, item.key);
      return `${makeString(item.value, propertyRecursion)}`;
    }
    const propertyLine = getProperty(property, item.key);
    switch (item.status) {
      case 'added':
        return `Property '${propertyLine}' was added with value: ${getValue(item.value)}`;
      case 'deleted':
        return `Property '${propertyLine}' was removed`;
      case 'changed_from':
        return `Property '${propertyLine}' was updated. From ${getValue(item.value)} to ${getValue(diffTree[index + 1].value)}`;
      default:
        return ``;
    }
  })
    .filter((item) => item !== '')
    .join('\n');
  return string;
};

const plain = (diffTree) => makeString(diffTree);

export default plain;
