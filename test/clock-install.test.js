var should = require('should')
  , assert = require('assert')
  , clockInstall = require('../index')()

describe('clock-install', function () {

  it('should return steps', function () {
    var steps = clockInstall.getSteps()
    assert.equal(typeof steps.init, 'function')
    assert.equal(typeof steps.symlink, 'function')
    assert.equal(typeof steps.restart, 'function')
  })

  it('should return steps list', function () {
    var stepList = clockInstall.getStepList()
    stepList.length.should.equal(3)
    stepList[0].should.equal('init')
    stepList[1].should.equal('symlink')
    stepList[2].should.equal('restart')
  })

  it('should run the init function', function (done) {
    var steps = clockInstall.getSteps()
      , context =
        { appId: 'myapp'
        , orderArgs: [ '1.0.0', 'staging' ]
        , appData: { buildDir: '/tmp/build', services: [ 'admin' ] }
        }

    steps.init(context, function (error, data) {
      should.not.exist(error)
      Object.keys(data).length.should.equal(5)
      data.appVersion.should.equal(context.orderArgs[0])
      data.environment.should.equal(context.orderArgs[1])

      var expectedBuildDir =
        context.appData.buildDir + '/' + context.appId + '-' + context.orderArgs[1] + '-' + context.orderArgs[0]

      data.buildDir.should.equal(expectedBuildDir)
      data.finalDir.should.equal(context.appData.buildDir + '/' + context.appId + '-' + context.orderArgs[1])
      data.services.length.should.equal(context.appData.services.length)
      done()
    })
  })

})
