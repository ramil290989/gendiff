import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (pathToFile) => {
  switch (path.extname(pathToFile)) {
    case '.json':
      return JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    case '.yaml':
      return yaml.load(fs.readFileSync(pathToFile, 'utf-8'));
    case '.yml':
      return yaml.load(fs.readFileSync(pathToFile, 'utf-8'));
    default:
      throw new Error('неверный формат файла');
  };
}

export default parser;
