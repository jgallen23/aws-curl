var repl = require("repl");
var AWS = require('aws-sdk');



var getInstanceHosts = function(config, callback) {

  config.filters = config.filters || {};
  AWS.config.update({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region });
  var svc = new AWS.EC2();

  //{ Filters: [{ Name: 'tag-value', Values: ['Production'] }]}
  var req = svc.client.describeInstances({ Filters: config.filters }, function(err, data) {
    if (err) {
      return callback(err);
    }
    var reservations = data.Reservations;

    var hosts = [];
    reservations.forEach(function(res) {

      res.Instances.forEach(function(instance) {

        hosts.push('http://'+instance.PublicDnsName);

      });
    });

    callback(err, hosts);
  });


};


module.exports = getInstanceHosts;
