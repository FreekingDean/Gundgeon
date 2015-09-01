var util = require('util');
function logger(env, ll){
  this.LOG_LEVEL = getLogLevel(env, ll);
  this.DEBUG_LEVEL = 1;
  this.INFO_LEVEL = 2;
  this.ERROR_LEVEL = 4;

  function getLogLevel(env, ll) {
    var ll = process.env.LOG_LEVEL
    if (env == 'development' || ll == 'debug') {
      return 7;
    } else if (env == 'staging' || ll == 'info') {
      return 3;
    } else {
      return 1;
    }
  }

  function log(type, msg) {
    console.log(type + ': ' + util.inspect(msg, {showHidden: false, depth: null}));
  }

  return {
    DEBUG: function (msg) {
      if (LOG_LEVEL & DEBUG_LEVEL) {
        log('DEBUG', msg);
      }
    },

    INFO: function(msg) {
      if (LOG_LEVEL & INFO_LEVEL) {
        log('INFO', msg);
      }
    },

    ERROR: function(msg) {
      log('ERROR', msg);
    }
  }
}

logger.prototype = {
}

module.exports = logger;
