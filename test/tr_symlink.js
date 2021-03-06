// based on this scenario:
// https://github.com/substack/node-browserify/pull/831#issuecomment-49546902

var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');

test('transform symlink', function (t) {
    t.plan(3);
    var expected = [ 9, 555 ];
    var b = browserify(__dirname + '/tr_symlink/app/main.js', {
        basedir: __dirname + '/tr_symlink/app'
    });
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { console: { log: log } };
        vm.runInNewContext(src, c);
        function log (msg) { t.equal(msg, expected.shift()) }
    });
});
