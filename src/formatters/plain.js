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
  const string = diffTree.reduce((line, item, index) => {
    if (Array.isArray(item.value) && item.status === 'nomod') {
      const propertyRecursion = getProperty(property, item.key);
      line = `${line}${makeString(item.value, propertyRecursion)}`;
      return line;
    }
    const propertyLine = getProperty(property, item.key);
    switch (item.status) {
      case 'added':
        line = `${line}Property '${propertyLine}' was added with value: ${getValue(item.value)}\n`;
        return line;
      case 'deleted':
        line = `${line}Property '${propertyLine}' was removed\n`;
        return line;
      case 'changed_from':
        line = `${line}Property '${propertyLine}' was updated. From ${getValue(item.value)} to ${getValue(diffTree[index + 1].value)}\n`;
        return line;
      default:
        return line;
    }
  }, '');
  return string;
}

const plain = (diffTree) => makeString(diffTree).trim();

export default plain;
