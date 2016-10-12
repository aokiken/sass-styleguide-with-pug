// todo: sassのコメントに記載されたpugのみ生成するようにするのが良さそう。
// todo: head内で読み込まれる内容の編集など

import gulp from 'gulp';
import pug from 'gulp-pug';
import concat from 'gulp-concat-util';
import replace from 'gulp-replace';

export default (styleguideDirName, pugDirPath) =>
  new Promise((resolve) => {
    gulp.src(`${pugDirPath}/**/*.pug`)
      .pipe((pug({ pretty: true })))
      .pipe(replace(/<!DOCTYPE html>|<html>|<head>[\s\S]*?<\/head>|<script.*?>[\s\S]*?<\/script>|<body.*?>|<\/body>|<\/html>/g, ''))
      .pipe(concat.header(`<!DOCTYPE html>\n<html>\n<head>\n  <title>style guide</title>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link rel="stylesheet" href="/style.css">\n</head>\n<body>`))
      .pipe(concat.footer(`\n<script>if (window.parent.document !== window.document) window.parent.document.getElementById(location.hash.substr(1)).style.height = document.body.scrollHeight + 'px';</script>\n</body>\n</html>`))
      .pipe(gulp.dest(`${styleguideDirName}/templates`))
      .on('end', () => resolve());
  });
