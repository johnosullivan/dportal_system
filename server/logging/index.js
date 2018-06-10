const apppackage = require('../../package.json');
const CONFIGS = require('../../config/server');
var winston_lib = require('winston');

const configLogging = () => {
  global.apm = require('elastic-apm-node').start({
    serviceName: apppackage.name + '_' + process.env.NODE_ENV,
    secretToken: CONFIGS.apm.secretToken,
    serverUrl: CONFIGS.apm.serverUrl,
  });
  require('winston-logstash');
  winston_lib.add(winston_lib.transports.Logstash, {
    port: CONFIGS.logstash.port,
    node_name: apppackage.name + '_' + process.env.NODE_ENV,
    host: CONFIGS.logstash.host
  });
  global.winston = winston_lib;
}

var winston = () => { return global.winston; }
var apm = () => { return global.apm; }

module.exports = {
  configLogging,
  winston,
  apm
}
