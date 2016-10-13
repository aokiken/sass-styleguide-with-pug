import recursive from 'recursive-readdir';
import fs from 'fs';
import pug from 'pug';

const checkDoc = (comment) => {
  const checkList = ['@title: ', '@pug: ', '@description: ', '@tags: '];
  const checkedList = checkList.filter((checkItem) => comment.indexOf(checkItem) !== -1);
  return checkList.length === checkedList.length;
};

const parser = (sassDirPath, pugDirPath) => new Promise((resolve) => {
  recursive(sassDirPath, ['!*.{scss,sass}'], (error, files) => {
    const documentList = [];
    let fileCount = 0;
    files.forEach((file) => {
      fs.readFile(file, 'utf-8', (err, data) => {
        fileCount += 1;
        const list = data.match(/\*[\s\S]*?\*/g);
        if (list !== null) {
          list.forEach((item) => {
            if (checkDoc(item)) {
              documentList.push({
                title: item.match(/@title.*\n/g)[0].replace(/@title: |\n/g, ''),
                directory: file.replace(`${sassDirPath}/`, '').split('/')[0],
                pug: `${pugDirPath}/${item.match(/@pug.*\n/g)[0].replace(/@pug: |\n/g, '')}`,
                description: item.match(/@description.*\n/g)[0].replace(/@description: |\n/g, ''),
                tags: item.match(/@tags.*\n/g)[0].replace(/@tags: |\n/g, '').split(','),
              });
            }
          });
        }
        if (files.length === fileCount) resolve(documentList);
      });
    });
  });
});

const pugCompile = (documentList) => {
  let count = 0;
  return new Promise((resolve) => {
    documentList.forEach((item, i) => {
      count += 1;
      documentList[i].code = pug.compileFile(item.pug, { pretty: true })();

      // bodyタグがある場合、<body.*?></body>の間の要素を抽出する
      // scriptタグがある場合、それを消去する
      documentList[i].code = documentList[i].code.replace(/<!DOCTYPE html>|<html>|<head>[\s\S]*?<\/head>|<script.*?>[\s\S]*?<\/script>|<body.*?>|<\/body>|<\/html>/g, '');

      documentList[i].classes = [];
      const classes = documentList[i].code.match(/class=".*?"/g);
      classes.forEach((matchItem) => {
        matchItem = matchItem.replace(/class="|"/g, '');
        if (matchItem.indexOf(' ') !== -1) {
          matchItem.split(' ').forEach((splitItem) => {
            documentList[i].classes.push(splitItem);
          });
        } else {
          documentList[i].classes.push(matchItem);
        }
      });
      if (documentList.length === count) resolve(documentList);
    });
  });
};

const writeFile = (styleguideDirName, documentList, pugDirPath) =>
  new Promise((resolve) => {
    documentList.forEach((item, i) => {
      documentList[i].id = i;
      documentList[i].url = item.pug.replace(pugDirPath, 'templates').replace('.pug', '.html');
    });
    fs.writeFileSync(`${styleguideDirName}/documents.json`, JSON.stringify(documentList, null, '  '));
    resolve();
  });

export default (styleguideDirName, sassDirPath, pugDirPath) =>
  parser(sassDirPath, pugDirPath)
    .then((documentList) => pugCompile(documentList))
    .then((documentList) => writeFile(styleguideDirName, documentList, pugDirPath));
