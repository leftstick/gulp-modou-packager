

var PLUGIN_NAME = 'gulp-modou-packager';


var endswith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var isInt = function(x) {
    var y = parseInt(x, 10);
    return !isNaN(y) && x == y && x.toString() == y.toString();
};

var gulpModouPackager = function(opts) {
    'use strict';

    if (!opts) {
        throw new PluginError(PLUGIN_NAME, 'opts can\'t be undefined');
    }
    if (!opts.packageName) {
        throw new PluginError(PLUGIN_NAME, 'opts.packageName can\'t be undefined');
    }
    if (!opts.compressLevel || !isInt(opts.compressLevel)) {
        opts.compressLevel = 1;
    }

    var gutil = require('gulp-util');
    var PluginError = gutil.PluginError;


    var path = require('path');
    var through = require('through2');
    var archiver = require('archiver');

    var archive = archiver('tar', {
        gzip: true,
        gzipOptions: {
            level: opts.compressLevel
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

            var fullname = endswith(opts.packageName, '.mpk') ? opts.packageName : opts.packageName + '.mpk';

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