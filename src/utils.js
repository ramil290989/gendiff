import fs from 'fs';

const getFileData = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  return JSON.parse(data);
};

export { getFileData };