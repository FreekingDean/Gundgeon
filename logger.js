function logger(){
  var LOG_LEVEL = this.getLogLevel();
  var DEBUG_LEVEL = 1;
  var INFO_LEVEL = 2;
  var ERROR_LEVEL = 4;

  function DEBUG(msg) {
    if (loglevel & DEBUG_LEVEL) {
      this.log('DEBUG', msg);
    }
  }

  function INFO(msg) {
    if (loglevel & INFO_LEVEL) {
      this.log('INFO', msg);
    }
  }

  function ERROR(msg) {
    this.log('ERROR', msg);
  }

  function getLogLevel() {
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
    console.log(type + ': ' + msg);
  }
}

module.exports = logger;
