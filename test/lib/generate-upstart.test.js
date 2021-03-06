var fs = require('fs')
  , sinon = require('sinon')
  , should = require('should')
  , rmdir = require('rmdir')
  , rewire = require('rewire')
  , generateFixture = require('./generate-upstart.fixture.js')
  , createGenerateUpstart = rewire('../../lib/generate-upstart')

describe('generate-upstart', function () {

  var testDir = '/tmp/navy-clock-install-upstart/'

  before(function (done) {
    fs.mkdir(testDir, function () {
      done()
    })
  })

  function runTest(customEnvVars, callback) {
    var emitSpy = sinon.spy()
      , context = { emit: emitSpy, appId: 'testAppId' }
      , data =
        { finalDir: '/tmp/my-app'
        , nodeVersion: '0.10.22'
        , environment: 'staging'
        , services:
          { site: 'site/app.js'
          , admin: 'admin/app.js'
          , api: 'api/app.js'
          }
        , customEnvVars: customEnvVars
        }

    createGenerateUpstart.__set__('upstartLocation', testDir)

    var generateUpstart = createGenerateUpstart()

    generateUpstart(context, data, function (error) {
      should.not.exist(error)
      emitSpy.calledThrice.should.equal(true, 'emit called count incorrect')

      Object.keys(data.services).forEach(function (service) {
        var upstartName = 'node-' + context.appId + '-' + data.environment + '-' + service + '.conf'
          , upstartPath = testDir + upstartName

        fs.existsSync(upstartPath).should.equal(true, upstartPath + ' does not exist')
        fs.readFileSync(upstartPath).toString().should.equal(generateFixture(service, context, data))
      })

      callback()
    })
  }

  it('should generate upstart jobs', function (done) {
    var customEnvVars =
        { TEST_ENV: 'hi'
        , TEST_ENV_TWO: 'hi2'
        }
    runTest(customEnvVars, done)
  })

  it('should not error when no custom env vars present', function (done) {
    var customEnvVars = null
    runTest(customEnvVars, done)
  })

  after(function (done) {
    rmdir(testDir, function () {
      done()
    })
  })

})
