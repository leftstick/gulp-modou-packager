

var PLUGIN_NAME = 'gulp-modou-packager';


var endswith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


var gulpModouPackager = function(packageName) {
    'use strict';

    var gutil = require('gulp-util');
    var PluginError = gutil.PluginError;

    if (!packageName) {
        throw new PluginError(PLUGIN_NAME, 'packageName can\'t be undefined');
    }

    var path = require('path');
    var through = require('through2');
    var archiver = require('archiver');

    var archive = archiver('tar', {
        gzip: true,
        gzipOptions: {
            level: 1
        }
    });
    var firstFile;


    var stream = through.obj(function(file, encoding, next) {

        if (file.isNull()) {
            return cb();
        }

        if (!firstFile) {
            firstFile = file;
        }
        archive.append(file.contents, {
            name: file.relative.replace(/\\/g, '/')
        });

        next();

    }, function(cb) {
            if (!firstFile) {
                return cb();
            }

            archive.finalize();

            var path = require('path');

            var fullname = endswith(packageName, '.mpk') ? packageName : packageName + '.mpk';

            var mpk = new gutil.File({
                cwd: firstFile.cwd,
                base: firstFile.base,
                path: path.join(firstFile.base, fullname),
                contents: archive
            });

            this.push(mpk);

            cb();

        });

    // returning the file stream
    return stream;
};

module.exports = gulpModouPackager;