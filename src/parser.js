import fs from 'fs';
import yaml from 'js-yaml';

const parser = (pathToFile, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    case '.yaml':
    case '.yml':
      return yaml.load(fs.readFileSync(pathToFile, 'utf-8'));
    default:
      throw new Error('неверный тип файла');
  }
};

export default parser;
