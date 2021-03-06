var path = require('path')
  , symlink = require('./lib/symlink')()
  , generateUpstart = require('./lib/generate-upstart')()

module.exports = function clockInstall() {

  var steps =
      { init: init
      , symlink: symlink
      , generateUpstart: generateUpstart
      , restart: function (context, data, callback) {
          if (!context.isMaster) return callback()
          context.executeOrder('restart', [], function () {
            callback()
          })
        }
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
          , environment: context.environment
          , services: context.appData.services
          , nodeVersion: context.appData.nodeVersion
          , customEnvVars: context.appData.env
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
