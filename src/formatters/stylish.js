const makeString = (diffTree, rep = 2) => {
  const count = rep + 4;
  const lines = diffTree.map((item) => {
    const resultValue = Array.isArray(item.value) ? makeString(item.value, count) : item.value;
    switch (item.status) {
      case 'nomod':
        return `${' '.repeat(rep)}  ${item.key}: ${resultValue}`;
      case 'changed_from':
        return `${' '.repeat(rep)}- ${item.key}: ${resultValue}`;
      case 'changed_to':
        return `${' '.repeat(rep)}+ ${item.key}: ${resultValue}`;
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
