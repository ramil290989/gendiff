const makeString = (diffTree, rep = 2) => {
  const count = rep + 4;
  const lines = diffTree.map((item) => {
    const resultValue = Array.isArray(item.value) ? makeString(item.value, count) : item.value;
    const resultOldValue = Array.isArray(item.oldValue) ? makeString(item.oldValue, count) : item.oldValue;
    const resultNewValue = Array.isArray(item.newValue) ? makeString(item.newValue, count) : item.newValue;
    switch (item.status) {
      case 'nomod':
        return `${' '.repeat(rep)}  ${item.key}: ${resultValue}`;
      case 'changed':
        return `${' '.repeat(rep)}- ${item.key}: ${resultOldValue}\n${' '.repeat(rep)}+ ${item.key}: ${resultNewValue}`;
      case 'deleted':
        return `${' '.repeat(rep)}- ${item.key}: ${resultValue}`;
      case 'added':
        return `${' '.repeat(rep)}+ ${item.key}: ${resultValue}`;
      default:
        throw new Error('что-то пошло не так');
    }
  })
    .join('\n');
  const result = `{\n${lines}\n${' '.repeat(rep - 2)}}`;
  return result;
};

const stylish = (diffTree) => makeString(diffTree);

export default stylish;
