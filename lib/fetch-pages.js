var request = require('request');
var async = require('async');

var fetchPages = function(hosts, path, callback) {

  path = path || '/';

  var makeRequest = function(req, cb) {
    request(req.host+req.path, function(err, res, body) {
      var obj = {
        host: req.host,
        path: req.path,
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
