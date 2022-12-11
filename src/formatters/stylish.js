const stylish = (diffTree) => {
  const makeString = (diffTree, rep = 1) => {
    rep += 1;
    const lines = diffTree.map((item) => {
      if (Array.isArray(item.value)) {
        rep += 3;
        item.value = `${makeString(item.value, rep)}`;
        rep -= 3;
      }
      switch (item.status) {
        case 'nomod':
          return `${' '.repeat(rep)}  ${item.key}: ${item.value}`;
        case 'changed_from':
          return `${' '.repeat(rep)}- ${item.key}: ${item.value}`;
        case 'changed_to':
          return `${' '.repeat(rep)}+ ${item.key}: ${item.value}`;
        case 'deleted':
          return `${' '.repeat(rep)}- ${item.key}: ${item.value}`;
        case 'added':
          return `${' '.repeat(rep)}+ ${item.key}: ${item.value}`;
        default:
          throw new Error('что-то пошло не так');
      }
    })
      .filter((item) => item !== '')
      .join('\n');
    const result = `{\n${lines}\n${' '.repeat(rep - 2)}}`;
    return result;
  }
  return makeString(diffTree);
};

export default stylish;
