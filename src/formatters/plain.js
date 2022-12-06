const getProperty = (property, key) => {
	let result = `${property}.${key}`;
	result = result[0] === '.' ? result.slice(1) : result;
	return result;
};


const getValue = (value) => {
	let result = '';
	switch (typeof value) {
		case 'object':
			result = value === null ? `${value}` : `[complex value]`;
			break;
		case 'string':
			result = `'${value}'`;
			break;
		default:
			result = `${value}`;
	}
	return result;
};


const plain = (diffTree) => {
	const makeString = (diffTree, property = '') => {
		let string = diffTree.reduce((line, item, index) => {
			if (Array.isArray(item.value) && item.status === 'nomod') {
				let propertyRecursion = getProperty(property, item.key);
				line =  `${line}${makeString(item.value, propertyRecursion)}`;
			} else {
				let propertyLine = getProperty(property, item.key);
				switch (item.status) {
					case 'added':
						line = `${line}Property '${propertyLine}' was added with value: ${getValue(item.value)}\n`;
						break;
					case 'deleted':
						line = `${line}Property '${propertyLine}' was removed\n`;
						break;
					case 'changed_from':
						line = `${line}Property '${propertyLine}' was updated. From ${getValue(item.value)} to ${getValue(diffTree[index+1].value)}\n`;
						break;
				}
			}
			return line;
		}, '');
		return string;
	}
	return makeString(diffTree).trim();
};

export default plain;