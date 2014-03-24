var fs = require('fs')

module.exports = function createSymlink() {

  function symlink(context, data, callback) {
    context.emit('Symlinking ' + data.buildDir + ' to ' + data.finalDir)
    fs.symlink(data.buildDir, data.finalDir, function (error) {
      callback(error, data)
    })
  }

  return symlink
}
