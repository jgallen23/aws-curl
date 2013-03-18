var assert = require('assert');
var curl = require('../lib/curl');

suite('curl', function() {

  test('error if missing key', function(done) {
    curl({}, function(err) {
      assert.notEqual(err, null);
      done();
    });
  });

  test('error if missing secret', function(done) {
    curl({ accessKeyId: '123'}, function(err) {
      assert.notEqual(err, null);
      done();
    });
  });

  test('error if missing region', function(done) {
    curl({ accessKeyId: '123', secretAccessKey: '123'}, function(err) {
      assert.notEqual(err, null);
      done();
    });
  });

});
