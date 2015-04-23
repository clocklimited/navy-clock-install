var fs = require('fs')
  , sinon = require('sinon')
  , should = require('should')
  , symlink = require('../../lib/symlink')()

describe('symlink', function () {

  describe('build dir exists', function () {

    before(function (done) {
      fs.mkdir('/tmp/symlink-test', function () {
        done()
      })
    })

    it('should create symlink', function (done) {
      var emitSpy = sinon.spy()
        , context = { emit: emitSpy }
        , data = { buildDir: '/tmp/symlink-test', finalDir: '/tmp/symlink-test-symlink' }

      symlink(context, data, function (error) {
        should.not.exist(error)
        emitSpy.calledOnce.should.equal(true)
        fs.exists('/tmp/symlink-test-symlink', function (exists) {
          exists.should.equal(true)
          done()
        })
      })
    })

    after(function (done) {
      fs.rmdir('/tmp/symlink-test/', function () {
        fs.unlink('/tmp/symlink-test-symlink', function () {
          done()
        })
      })
    })

  })

  describe('build dir does not exist', function () {

    it('should fail to create symlink', function (done) {
      var emitSpy = sinon.spy()
        , context = { emit: emitSpy }
        , data = { buildDir: '/tmp/not-exist', finalDir: '/tmp/symlink-test-symlink' }

      symlink(context, data, function (error) {
        should.exist(error)
        error.message.should.equal('Build directory does not exist: /tmp/not-exist')
        done()
      })
    })

  })

})
