sass-styleguide-with-pug
===
## Caution
このpackageはα版です。

## Overview
sass,scssファイルに記述された指定のコメントドックに応じてstyleguide(SPA)が生成

styleguide(SPA)でディレクトリ別、タグ別、検索機能、個別閲覧

iframeで生成されたhtmlを呼び出しているので、余計なコードがない状態を担保する

## Sample Project
* [aokiken/purecss_styleguide](https://github.com/aokiken/purecss_styleguide)

## Sample gulpfile.js
```js
var gulp = require('gulp');
var styleguideTask = require('sass-styleguide-with-pug');

gulp.task('styleguideTask',function(){
  styleguideTask({
     styleguideDirName: 'styleguide',
     sassDirPath: 'src/sass',
     pugDirPath: 'src/pug',
     stylesheetPath: 'dest/css/style.css',
     imageDirPath: 'dest/images',
     fontDirPath: 'dest/fonts'
   });
});
```
