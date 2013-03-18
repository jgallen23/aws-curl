
var getInstances = require('./get-instances');
var fetchPages = require('./fetch-pages');

var curl = function(config, callback) {

  getInstances(config, function(err, instances) {

    if (err) {
      return callback(err);
    }
    config.path = config.path || '/';

    var hosts = instances.map(function(instance) {
      return instance.host;
    });

    fetchPages(hosts, config.path, function(err, pages) {
      if (err) {
        return callback(err);
      }


      callback(err, pages);

    });

  });

};

module.exports = curl;
