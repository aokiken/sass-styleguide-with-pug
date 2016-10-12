import fse from 'fs-extra';

export default ({ styleguideDirName }) =>
  new Promise(({ resolve }) => fse.copySync(`${__dirname}/../spa`, styleguideDirName, null, () => resolve()));
