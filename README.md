gulp-modou-packager
===================

[![NPM version][npm-image]][npm-url]
![][david-url]
![][travis-url]

a [gulp](http://gulpjs.com/) plugin can package modou-plugin source files into `.mpk`, useful while developing modou plugin.

## Install ##

```Shell
npm install gulp-modou-packager --save-dev
```

## Usage ##

Let's take [welcome-page](https://github.com/modouwifi/welcome-page) as example:

```JavaScript
var packager = require('gulp-modou-packager');

gulp.src(['init', 'manifest.json', 'welcome.html'])
    .pipe(packager('welcome.mpk'))
    .pipe(gulp.dest('test/'));
```

An `.mpk` file would be generated under `test/` folder.


`packager` only allows one string parameter which define the `packageName`.

And if `packageName` doesn't contain a suffix `.mpk`, `gulp-modou-packager` append it for you. 


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/gulp-modou-packager/master/LICENSE)


[npm-url]: https://npmjs.org/package/gulp-modou-packager
[npm-image]: https://badge.fury.io/js/gulp-modou-packager.png
[david-url]:https://david-dm.org/leftstick/gulp-modou-packager.png
[travis-url]:https://api.travis-ci.org/leftstick/gulp-modou-packager.svg?branch=master