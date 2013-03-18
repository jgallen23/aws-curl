var request = require('request');
var async = require('async');

var fetchPages = function(hosts, path, callback, cacheBuster) {

  path = path || '/';

  var makeRequest = function(req, cb) {
    var url = req.host+req.path;
    if (cacheBuster) {
      var buster = Math.floor(Math.random()*10000001);
      url += "?_cb="+buster;
    }
    request(url, function(err, res, body) {
      var obj = {
        host: req.host,
        path: req.path,
        url: url,
        data: body
      };
      cb(err, obj);
    });
  };

  var requests = hosts.map(function(host) {
    return {
      host: host,
      path: path
    };
  });

  async.map(requests, makeRequest, callback);

};

module.exports = fetchPages;
