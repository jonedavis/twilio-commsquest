const expect = require('chai').expect;
const supertest = require('supertest');
const nock = require('nock');
const app = require('../src/server');
const agent = supertest(app);

// don't let any traffic through to the internet except localhost
nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

describe('Commsquest IV - Home', () => {
  describe('GET /', () => {
    it('returns home page', done => {
      agent
        .get('/')
        .expect(response => {
          expect(response.text).to.contain('SYNC PLAYER 1');
        })
        .expect(200, done);
    });
  });
});

describe('Commsquest IV - Controller', () => {
  describe('GET /', () => {
    it('returns controller page', done => {
      agent
        .get('/game/15555555')
        .expect(response => {
          expect(response.text).to.contain('TO BEGIN YOUR QUEST');
        })
        .expect(200, done);
    });
  });
});
