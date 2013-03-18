
var getInstanceHosts = require('./get-instance-hosts');
var fetchPages = require('./fetch-pages');

var curl = function(config, callback) {

  getInstanceHosts(config, function(err, hosts) {

    if (err) {
      return callback(err);
    }
    config.path = config.path || '/';

    fetchPages(hosts, config.path, function(err, pages) {
      if (err) {
        return callback(err);
      }


      callback(err, pages);

    });

  });

};

module.exports = curl;
