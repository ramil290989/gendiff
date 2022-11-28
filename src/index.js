import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';


const parsers = (pathToFile) => {
  if (path.extname(pathToFile) === '.json') {
    const data = fs.readFileSync(pathToFile, 'utf-8');
  return JSON.parse(data);
  }
  if (path.extname(pathToFile) === '.yaml' || path.extname(pathToFile) === '.yml') {
    const data = fs.readFileSync(pathToFile, 'utf-8');
    return yaml.load(data);
  }
}

const getKeys = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  let keys = _.sortBy([...keysFile1, ...keysFile2]);
  keys = keys.filter((item, index) => {
    return keys.indexOf(item) === index;
  });
  return keys;
};

const genDiff = (file1, file2) => {
  file1 = parsers(file1);
  file2 = parsers(file2);
  const keys = getKeys(file1, file2);
  let diff = keys.reduce((str, key) => {
    if (Object.keys(file1).includes(key)) {
      if (Object.keys(file2).includes(key)) {
        if (file1[key] === file2[key]) {
          str = `  ${str}\n    ${key}: ${file1[key]}`;
        } else {
          str = `  ${str}\n  - ${key}: ${file1[key]}`;
          str = `  ${str}\n  + ${key}: ${file2[key]}`;
        }
      } else {
        str = `  ${str}\n  - ${key}: ${file1[key]}`;
      }
    } else {
      str = `  ${str}\n  + ${key}: ${file2[key]}`;
    }
    return str;
  }, '');
  diff = `{${diff}\n}`;
  return diff;
};

export default genDiff;

