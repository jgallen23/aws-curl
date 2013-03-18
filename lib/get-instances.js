var repl = require("repl");
var AWS = require('aws-sdk');



var getInstances = function(config, callback) {

  config.filters = config.filters || {};
  AWS.config.update({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region });
  var svc = new AWS.EC2();

  //{ Filters: [{ Name: 'tag-value', Values: ['Production'] }]}
  var req = svc.client.describeInstances({ Filters: config.filters }, function(err, data) {
    if (err) {
      return callback(err);
    }
    var reservations = data.Reservations;

    var instances = [];
    reservations.forEach(function(res) {

      res.Instances.forEach(function(instance) {

        instances.push({
          id: instance.InstanceId,
          host: 'http://'+instance.PublicDnsName,
          state: instance.State.Name,
          keyName: instance.KeyName,
          type: instance.InstanceType,
          privateIp: instance.PrivateIpAddress,
          publicIp: instance.PublicIpAddress
        });

      });
    });

    callback(err, instances);
  });


};


module.exports = getInstances;
