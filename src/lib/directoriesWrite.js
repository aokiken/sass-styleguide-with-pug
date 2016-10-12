import fs from 'fs';

const isDir = ({ filePath }) => fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();

export default (styleguideDirName, sassDirPath) =>
  new Promise((resolve) => {
    fs.readdir(sassDirPath, (err, folders) => {
      const list = [];
      folders.forEach((folder) => {
        if (isDir(`${sassDirPath}/${folder}`)) {
          list.push({ name: folder });
        }
      });
      fs.writeFileSync(`${styleguideDirName}/directories.json`, JSON.stringify(list, null, '  '));
      resolve();
    });
  });
