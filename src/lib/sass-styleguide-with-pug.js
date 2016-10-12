import spaCopy from './spaCopy';
import directoriesWrite from './directoriesWrite';
import documentsWrite from './documentsWrite';
import pugTasks from './pugTasks';
import assetCopy from './assetCopy';

export default (options, callback) => {
  const defaults = {
    styleguideDirName: 'styleguide',
    sassDirPath: 'src/sass',
    pugDirPath: 'src/pug',
    stylesheetPath: 'dest/css/style.css',
    imageDirPath: 'dest/images',
    fontDirPath: 'dest/fonts',
  };
  const config = Object.assign(defaults, options);
  spaCopy(config.styleguideDirName)
    .then(directoriesWrite(config.styleguideDirName, config.sassDirPath))
    .then(documentsWrite(config.styleguideDirName, config.sassDirPath, config.pugDirPath))
    .then(pugTasks(config.styleguideDirName, config.pugDirPath))
    .then(assetCopy(
      config.styleguideDirName,
      config.stylesheetPath,
      config.imageDirPath,
      config.fontDirPath
    ))
    .then(() => callback());
};
