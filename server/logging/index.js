const apppackage = require('../../package.json');

function startLogging() {
  // configs the application performance management  in nodejs elasticsearch
  global.apm = require('elastic-apm-node').start({
    serviceName: apppackage.name + '_' + process.env.NODE_ENV,
    secretToken: '',
    serverUrl: '',
  });
  // logstash connecting to elasticsearch
  
}

module.exports = {
  startLogging
}
