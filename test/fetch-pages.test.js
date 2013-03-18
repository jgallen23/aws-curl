var assert = require('assert');
var nock = require('nock');


var fetchPages = require('../lib/fetch-pages');
suite('fetchPages', function() {

  var testHosts = ['http://google.com', 'http://yahoo.com', 'http://facebook.com'];
  var testPath = '/page';

  setup(function() {

    testHosts.forEach(function(host) {
      nock(host)
        .filteringPath(function(path) {
          return '/';
        })
        .get('/')
        .reply(200, 'This is a response from '+host+testPath);
    });

  });

  test('fetch / from testHosts', function(done) {
    fetchPages(testHosts, testPath, function(err, res) {

      assert.equal(err, null);
      assert.equal(res.length, 3);

      testHosts.forEach(function(host, index) {

        assert.equal(res[index].host, host);
        assert.equal(res[index].path, testPath);
        assert.equal(res[index].url, host+testPath);
        assert.equal(res[index].data, 'This is a response from '+host+testPath);

      });

      done();

    });
  });

  test('fetch / from testHosts', function(done) {
    fetchPages(testHosts, testPath, function(err, res) {

      testHosts.forEach(function(host, index) {

        assert.equal(res[index].host, host);
        assert.equal(res[index].path, testPath);
        assert.equal(res[index].url, host+testPath);
        assert.equal(res[index].data, 'This is a response from '+host+testPath);


      });

      done();

    });
  });

  test('fetch with cache buster', function(done) {

    fetchPages(testHosts, testPath, function(err, res) {

      testHosts.forEach(function(host, index) {

        assert.equal(res[index].host, host);
        assert.equal(res[index].path, testPath);
        assert.equal(res[index].data, 'This is a response from '+host+testPath);
        assert.notEqual(res[index].url.indexOf('?_cb='), -1);


      });

      done();

    }, true);

  });

});
