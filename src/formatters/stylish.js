const stylish = (diff) => {
  const makeString = (diff, rep = 1) => {
    rep += 1;
    let string = `{\n`;
    let lines = Object.keys(diff).reduce((line, key) => {
      if (diff[key] === null) {
        diff[key] = 'null';
      }
      if (typeof diff[key] === 'object') {
        rep += 1;
        let subline = `${makeString(diff[key], rep)}`;
        rep -= 1;
        return line = `${line}${' '.repeat(rep)}${key}: ${subline}`;
      } else {
        line = `${line}${' '.repeat(rep)}${key}: ${diff[key]}\n`;
        return line;
      }
    }, '');
    string = `${string}${lines}${' '.repeat(rep - 2)}}\n`;
    return string;
  };
  let result = makeString(diff);
  return result.trim();
};

export default stylish;