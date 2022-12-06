const stylish = (diffTree) => {
  const makeString = (diffTree, rep = 1) => {
    rep += 1;
    let string = `{\n`;
		let lines = diffTree.reduce((line, item) => {
			if (Array.isArray(item.value)) {
				rep += 3;
        item.value = `${makeString(item.value, rep)}`;
				rep -= 3;
			} 
			switch (item.status) {
				case 'nomod':
					line = `${line}${' '.repeat(rep)}  ${item.key}: ${item.value}\n`;
					break;
				case 'changed_from':
					line = `${line}${' '.repeat(rep)}- ${item.key}: ${item.value}\n`;
					break;
				case 'changed_to':
					line = `${line}${' '.repeat(rep)}+ ${item.key}: ${item.value}\n`;
					break;
				case 'deleted':
					line = `${line}${' '.repeat(rep)}- ${item.key}: ${item.value}\n`;
					break;
				case 'added':
					line = `${line}${' '.repeat(rep)}+ ${item.key}: ${item.value}\n`;
					break;
				default:
					throw new Error('что-то пошло не так');
			}			
			return line;
		},'');
		string = `${string}${lines}${' '.repeat(rep - 2)}}`;
    return string;
	}
	return makeString(diffTree);
};

export default stylish;