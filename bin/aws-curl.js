#!/usr/bin/env node

var rc = require('rc');
var colors = require('colors');
var curl = require('../lib/curl');
var getInstances = require('../lib/get-instances');


var opts = rc('awscurl', {
});

console.log('');
if (opts.help) {
  console.log('TODO: help message');
  process.exit(0);
}

if (opts.ls) {

  getInstances(opts, function(err, instances) {
    instances.forEach(function(instance) {
      console.log(instance.host.green);
      console.log('ID:'.grey, instance.id.yellow);
      console.log('KeyName:'.grey, instance.keyName.yellow);
      console.log('State:'.grey, instance.state.yellow);
      console.log('Type:'.grey, instance.type.yellow);
      console.log('');

    });
    process.exit(0);
  });


}

curl(opts, function(err, results) {
  if (err) {
    return console.log(err);
  }
  if (opts.regex) {
    if (typeof opts.regex == 'string') {
      opts.regex = [opts.regex];
    }
    opts.regex.forEach(function(regex) {
      var re = new RegExp(regex);
      console.log('Searching for'.grey, regex.green);
      console.log('-----------------------------------');
      console.log('');
      results.forEach(function(result) {
        var match = result.data.match(re);
        console.log(result.url.grey);
        if (!match) {
          console.log('No Matches');
        } else {
          console.log(match[0]);
        }
        console.log('');
      });
      console.log('');
    });
  } else {
    console.log('coming soon');
  }
});

