var debugLog = bunyan.createLogger({
  name: 'general',
  streams: [
    {
      level: 'debug',
      path: './../logs/debug.log',
    },
  ],
});

var errorLog = bunyan.createLogger({
  name: 'general',
  streams: [
    {
      level: 'error',
      path: './../logs/error.log',
    },
  ],
});

module.exports = { debugLog, errorLog };
