const getProperty = (property, key) => {
	if (`${property}.${key}`[0] === '.') {
    return `${property}.${key}`.slice(1);
  }
  return `${property}.${key}`;
};

const getValue = (value) => {
	switch (typeof value) {
		case 'object':
			return value === null ? `${value}` : `[complex value]`;
		case 'string':
			return `'${value}'`;
		default:
			return `${value}`;
	}
};

const plain = (diffTree) => {
	const makeString = (diffTree, property = '') => {
		const string = diffTree.reduce((line, item, index) => {
			if (Array.isArray(item.value) && item.status === 'nomod') {
				const propertyRecursion = getProperty(property, item.key);
        return line = `${line}${makeString(item.value, propertyRecursion)}`;
			}
      const propertyLine = getProperty(property, item.key);
      switch (item.status) {
        case 'added':
          return line = `${line}Property '${propertyLine}' was added with value: ${getValue(item.value)}\n`;
        case 'deleted':
          return line = `${line}Property '${propertyLine}' was removed\n`;
        case 'changed_from':
          return line = `${line}Property '${propertyLine}' was updated. From ${getValue(item.value)} to ${getValue(diffTree[index+1].value)}\n`;
        default:
          return line;
      }
		}, '');
		return string;
	}
	return makeString(diffTree).trim();
};


export default plain;
