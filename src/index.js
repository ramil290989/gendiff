import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import stylish from './formatters/stylish.js';


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

const getKeys = (file1Parse, file2Parse) => {
  const keysFile1 = Object.keys(file1Parse);
  const keysFile2 = Object.keys(file2Parse);
  let keys = _.sortBy([...keysFile1, ...keysFile2]);
  keys = keys.filter((item, index) => {
    return keys.indexOf(item) === index;
  });
  return keys;
};

const makeDiff = (file1Parse, file2Parse) => {
  const keys = getKeys(file1Parse, file2Parse);
  let diff = keys.reduce((obj, key) => {
    let objKey = '';
    if (typeof file1Parse[key] === 'object' && typeof file2Parse[key] === 'object') {
      objKey = `  ${key}`;
      obj[objKey] = makeDiff(file1Parse[key], file2Parse[key]);
    } else {
      if (Object.keys(file1Parse).includes(key)) {
        if (Object.keys(file2Parse).includes(key)) {
          if (file1Parse[key] === file2Parse[key]) {
            objKey = `  ${key}`;
            obj[objKey] = file1Parse[key];
          } else {
            objKey = `- ${key}`;
            obj[objKey] = file1Parse[key];
            objKey = `+ ${key}`;
            obj[objKey] = file2Parse[key];
          }
        } else {
          objKey = `- ${key}`;
          obj[objKey] = file1Parse[key];
        }
      } else {
        objKey = `+ ${key}`;
        obj[objKey] = file2Parse[key];
      }
    }
    return obj;
  }, {});
  return diff;
}

const genDiff = (file1, file2, format = 'stylish') => {
  let file1Parse = parsers(file1);
  let file2Parse = parsers(file2);
  let result = makeDiff(file1Parse, file2Parse);
  switch (format) {
    case 'stylish':
      return stylish(result);
  }
};

export default genDiff;

