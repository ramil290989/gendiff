import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';


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

const genDiffTree = (file1 = {}, file2 = {}) => {
	const withoutMarkers = (file1, file2) => {
		let keys = getKeys(file1, file2);
		let resultWithoutMarkers = keys.reduce((array, key) => {
			let item = {};
			if (typeof file2[key] !== 'object' && typeof file1[key] !== 'object') {
				if (file2 === 0) {
					item = {key: key, value: file1[key], status: 'nomod'};
					array.push(item);
					return array;
				} else {
					item = {key: key, value: file2[key], status: 'nomod'};
					array.push(item);
					return array;
				}
			} else {
				if (file2 === 0) {
					item = {key: key, value: withoutMarkers(file1[key], 0), status: 'nomod'};
					array.push(item);
					return array;
				} else {
					item = {key: key, value: withoutMarkers(0, file2[key]), status: 'nomod'};
					array.push(item);
					return array;
				}
			}
		}, []);
		return resultWithoutMarkers;
	};

	const withMarkers = (file1 = {}, file2 = {}) => {
		let keys = getKeys(file1, file2);
		let resultWithMarkers = keys.reduce((array, key) => {
			let item = {};
			if (Object.keys(file1).includes(key)) {
				if (Object.keys(file2).includes(key)) {
					if (typeof file1[key] !== 'object' && typeof file2[key] !== 'object') {
						if (file1[key] === file2[key]) {
							item = {key: key, value: file1[key], status: 'nomod'};
							array.push(item);
							return array;
						} else {
							item = {key: key, value: file1[key], status: 'changed_from'};
							array.push(item);
							item = {key: key, value: file2[key], status: 'changed_to'};
							array.push(item);
							return array;
						}
					} else if (typeof file1[key] === 'object' && typeof file2[key] !== 'object') {
						item = file1[key] === null ? {key: key, value: file1[key], status: 'changed_from'} : {key: key, value: withoutMarkers(file1[key], 0), status: 'changed_from'};
						array.push(item);
						item = {key: key, value: file2[key], status: 'changed_to'};
						array.push(item);
						return array;
					} else 
					if (typeof file1[key] !== 'object' && typeof file2[key] === 'object') {
						item = {key: key, value: file1[key], status: 'changed_from'};
						array.push(item);
						item = file2[key] === null ? {key: key, value: file2[key], status: 'changed_to'} : {key: key, value: withoutMarkers(0, file2[key]), status: 'changed_to'};
						array.push(item);
						return array;
					} else {
						item = {key: key, value: withMarkers(file1[key], file2[key]), status: 'nomod'};
						array.push(item);
						return array;
					}
				} 
				if (typeof file1[key] !== 'object') {
					item = {key: key, value: file1[key], status: 'deleted'};
					array.push(item);
					return array;
				} else {
					item = {key: key, value: withoutMarkers(file1[key], 0), status: 'deleted'};
				array.push(item);
				return array;
				}
			}
			if (typeof file1[key] !== 'object' && typeof file2[key] !== 'object') {
				item = {key: key, value: file2[key], status: 'added'};
				array.push(item);
				return array;
			} else {
				item = {key: key, value: withoutMarkers(0, file2[key]), status: 'added'};
				array.push(item);
				return array;
			}
		}, []);
		return resultWithMarkers;
	};
	return withMarkers(file1, file2);
};

const genDiff = (file1, file2, format = 'stylish') => {
  let file1Parse = parsers(file1);
  let file2Parse = parsers(file2);
  let result = genDiffTree(file1Parse, file2Parse);
  switch (format) {
    case 'stylish':
      return stylish(result);
		case 'plain':
			return plain(result);
		case 'json':
			return json(result);
		default:
			return stylish(result);
  }
};

export default genDiff;

