import yaml from 'js-yaml';

const parser = (fileContent, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yaml':
    case '.yml':
      return yaml.load(fileContent);
    default:
      throw new Error('неверный тип файла');
  }
};

export default parser;
