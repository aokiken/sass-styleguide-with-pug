sass-styleguide-with-pug
===
## Caution
このpackageはα版です

## Overview
* sass,scssファイルに記述された指定のコメントドックに応じてstyleguide(SPA)を生成
* styleguide(SPA)でディレクトリ別、タグ別、検索機能、個別閲覧が可能
* iframeで生成されたhtmlを呼び出しているので、余計なコードがない状態を担保

## Sample Project
* [aokiken/purecss_styleguide](https://github.com/aokiken/purecss_styleguide)

## Sample workspace
```
// 開発構成
.
├── dest
│   ├── css
│   │   └── style.css
│   ├── images
│   └── fonts
├── gulpfile.js
├── package.json
└── src
    ├── images
    ├── fonts
    ├── pug
    │   └── styleguide
    │       └── components
    │           └── buttons
    │               └── default_buttons.pug
    └── sass
        └── components
            └── buttons.scss
```

```js
// gulpfile.js
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

```scss
// src/sass/components/buttons.scss
/*
@title: Default Buttons
@pug: components/buttons/default_buttons.pug
@description: buttonサンプル
@tags: component,button
*/
```

```pug
// src/pug/styleguide/components/buttons/default_buttons.pug
a.pure-button(href="#") A Pure Button
button.pure-button A Pure Button
```
