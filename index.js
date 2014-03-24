var path = require('path')
  , symlink = require('./lib/symlink')()

module.exports = function clockInstall() {

  var steps =
  { init: init
  , symlink: symlink
  }

  function getSteps() {
    return steps
  }

  function getStepList() {
    return Object.keys(steps)
  }

  function init(context, callback) {
    var data =
          { appVersion: context.orderArgs[0]
          , environment: context.orderArgs[1]
          }
      , baseName = context.appId + '-' + data.environment
      , buildDirName = baseName + '-' + data.appVersion
      , buildDir = path.join(context.appData.buildDir, buildDirName)
      , finalDir = path.join(context.appData.buildDir, baseName)

    data.buildDir = buildDir
    data.finalDir = finalDir
    callback(null, data)
  }

  return {
    getSteps: getSteps
  , getStepList: getStepList
  }

}
