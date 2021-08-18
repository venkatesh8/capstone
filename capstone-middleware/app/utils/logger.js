const bunyan = require('bunyan');
const path = require('path');

const debugLog = bunyan.createLogger({
  name: 'debug',
  streams: [
    {
      level: 'debug',
      path: path.resolve(__dirname, "..", "logs", "debug.log")
    },
  ],
});

var errorLog = bunyan.createLogger({
  name: 'error',
  streams: [
    {
      level: 'error',
      path: path.resolve(__dirname, "..", "logs","error.log"),
    },
  ],
});

const log = {};
log.debugLog = debugLog;
log.errorLog = errorLog;

module.exports = log;
