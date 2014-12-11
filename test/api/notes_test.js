process.env.MONGO_URL = 'mongodb://localhost/notes_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic notes crud', function() {

  var id;
  var token;

  it('should not allow short password', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({email:'dGVzdEB0ZXN0LmNvbQ==', password:'dGVzdA==', passwordConfirmation: 'dGVzdA==', admin:true})
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res.status).to.eql(500);
      done();
    });
  });

  it('should not allow no password', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({email:'dGVzdEB0ZXN0LmNvbQ==', password: '', passwordConfirmation: '', admin:true})
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res.status).to.eql(500);
      done();
    });
  });

  it('should log user in', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({email:'dGVzdEB0ZXN0LmNvbQ==',password:'dGVzdHRlc3Q=', passwordConfirmation: 'dGVzdHRlc3Q=', admin:true})
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res.body).to.have.property('jwt');
      token = res.body.jwt;
      done();
    });
  });

  it('should be able to create a note', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/notes')
    .set({jwt:token})
    .send({noteBody:"hello world"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('hello world');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to get an index', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/notes')
    .set({jwt:token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should be able to get a single note', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/notes/' + id)
    .set({jwt:token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('hello world');
      done();
    });
  });

  it('should be able to update a note', function(done) {
    chai.request('http://localhost:3000')
    .put('/api/notes/' + id)
    .set({jwt:token})
    .send({noteBody: 'new note body'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('new note body');
      done();
    });
  });

  it('should be able to destroy a note', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/notes/' + id)
    .set({jwt:token})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});
