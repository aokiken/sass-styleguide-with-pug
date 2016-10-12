// TODO:現在style.css,images,fontsが固定値になっている
import fse from 'fs-extra';

const stylesheetCopy = (styleguideDirName, stylesheet) =>
  new Promise(({ resolve }) =>
    fse.copySync(stylesheet, `${styleguideDirName}/style.css`, null, () => resolve()));
const imageDirCopy = (styleguideDirName, imageDir) =>
  new Promise(({ resolve }) =>
    fse.copySync(imageDir, `${styleguideDirName}/images`, null, () => resolve()));
const fontDirCopy = (styleguideDirName, fontDir) =>
  new Promise(({ resolve }) =>
    fse.copySync(fontDir, `${styleguideDirName}/fonts`, null, () => resolve()));

export default (styleguideDirName, stylesheetPath, imageDirPath, fontPath) =>
  stylesheetCopy(styleguideDirName, stylesheetPath)
    .then(imageDirCopy(styleguideDirName, imageDirPath))
    .then(fontDirCopy(styleguideDirName, fontPath));
