var fs = require('fs')

module.exports = function createSymlink() {

  function symlink(context, data, callback) {
    fs.exists(data.buildDir, function (exists) {
      if (!exists) return callback(new Error('Build directory does not exist: ' + data.buildDir))
      context.emit('Symlinking ' + data.buildDir + ' to ' + data.finalDir)
      fs.unlink(data.finalDir, function () {
        fs.symlink(data.buildDir, data.finalDir, function (error) {
          callback(error, data)
        })
      })
    })
  }

  return symlink
}
