var should = require('should')
  , assert = require('assert')
  , clockInstall = require('../index')()

describe('clock-install', function () {

  it('should return steps', function () {
    var steps = clockInstall.getSteps()
    assert.equal(typeof steps.init, 'function')
    assert.equal(typeof steps.symlink, 'function')
    assert.equal(typeof steps.generateUpstart, 'function')
    assert.equal(typeof steps.restart, 'function')
  })

  it('should return steps list', function () {
    var stepList = clockInstall.getStepList()
    stepList.length.should.equal(4)
    stepList[0].should.equal('init')
    stepList[1].should.equal('symlink')
    stepList[2].should.equal('generateUpstart')
    stepList[3].should.equal('restart')
  })

  it('should run the init function', function (done) {
    var steps = clockInstall.getSteps()
      , context =
        { appId: 'myapp'
        , environment: 'staging'
        , orderArgs: [ '1.0.0' ]
        , appData: { buildDir: '/tmp/build', services: [ 'admin' ], nodeVersion: '0.10.22' }
        }

    steps.init(context, function (error, data) {
      should.not.exist(error)
      Object.keys(data).length.should.equal(6)
      data.appVersion.should.equal(context.orderArgs[0])
      data.environment.should.equal(context.environment)

      var expectedFinalDir = context.appData.buildDir + '/'
            + context.appId + '-' + context.environment
        , expectedBuildDir = expectedFinalDir + '-' + context.orderArgs[0]

      data.buildDir.should.equal(expectedBuildDir)
      data.finalDir.should.equal(expectedFinalDir)
      data.services.length.should.equal(context.appData.services.length)
      data.nodeVersion.should.equal(context.appData.nodeVersion)
      done()
    })
  })

})
