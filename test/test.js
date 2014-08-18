
var packager = require('../');
var gulp = require('gulp');
var clean = require('gulp-clean');

var describe = require('mocha').describe;
var afterEach = require('mocha').afterEach;
var it = require('mocha').it;
var should = require('should');

describe('basic test', function() {

    afterEach(function() {
        return gulp.src('test/welcome.mpk', {
            read: false
        })
            .pipe(clean());
    });

    it('test packageName without suffix', function(done) {
        var stream = gulp.src(['test/testfiles/init', 'test/testfiles/manifest.json', 'test/testfiles/welcome.html'])
            .pipe(packager({
                packageName: 'welcome'
            }))
            .pipe(gulp.dest('test/'));

        stream.on('end', function() {
            var fs = require('fs');
            should(fs.existsSync('test/welcome.mpk')).eql(true, 'welcome.mpk isn\'t generated correctly');
            done();
        });
    });


    it('test packageName with suffix', function(done) {
        var stream = gulp.src(['test/testfiles/init', 'test/testfiles/manifest.json', 'test/testfiles/welcome.html'])
            .pipe(packager({
                packageName: 'welcome'
            }))
            .pipe(gulp.dest('test/'));

        stream.on('end', function() {
            var fs = require('fs');
            should(fs.existsSync('test/welcome.mpk')).eql(true, 'welcome.mpk isn\'t generated correctly');
            done();
        });
    });

    it('use wildcard', function(done) {
        var stream = gulp.src('test/testfiles/*')
            .pipe(packager({
                packageName: 'welcome'
            }))
            .pipe(gulp.dest('test/'));

        stream.on('end', function() {
            var fs = require('fs');
            should(fs.existsSync('test/welcome.mpk')).eql(true, 'welcome.mpk isn\'t generated correctly');
            done();
        });
    });

    it('set compressLevel', function(done) {
        var stream = gulp.src('test/testfiles/*')
            .pipe(packager({
                packageName: 'welcome',
                compressLevel: 5
            }))
            .pipe(gulp.dest('test/'));

        stream.on('end', function() {
            var fs = require('fs');
            should(fs.existsSync('test/welcome.mpk')).eql(true, 'welcome.mpk isn\'t generated correctly');
            done();
        });
    });

});
