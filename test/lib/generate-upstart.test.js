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

  it('should generate upstart jobs', function (done) {
    var emitSpy = sinon.spy()
      , context = { emit: emitSpy, appId: 'testAppId' }
      , data =
        { finalDir: '/tmp/my-app'
        , nodeVersion: '0.10.22'
        , environment: 'staging'
        , client: 'testClient'
        , services:
          { site: 'site/app.js'
          , admin: 'admin/app.js'
          , api: 'api/app.js'
          }
        }

    createGenerateUpstart.__set__('upstartLocation', testDir)

    var generateUpstart = createGenerateUpstart()

    generateUpstart(context, data, function (error) {
      should.not.exist(error)
      emitSpy.calledThrice.should.equal(true, 'emit called count incorrect')

      Object.keys(data.services).forEach(function (service) {
        var upstartName = 'node-' + data.client + '-' + context.appId + '-' + data.environment + '-' + service + '.conf'
          , upstartPath = testDir + upstartName

        fs.existsSync(upstartPath).should.equal(true, upstartPath + ' does not exist')
        fs.readFileSync(upstartPath).toString().should.equal(generateFixture(service, context, data))
      })

      done()
    })
  })

  after(function (done) {
    rmdir(testDir, function () {
      done()
    })
  })

})
