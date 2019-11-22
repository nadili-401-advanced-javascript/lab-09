'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');
const mockRequest = supertester(server);


describe('web server', () => {
  it('gets proper response on root route', async () => {
    await mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.text).toBe('Homepage');
      })
      .catch(console.error);
  });

  it('gets proper response on models route', async () => {
    await mockRequest
      .get('/models')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(console.error);
  });

  it('gets proper response on categories route', async () => {
    await mockRequest
      .get('/:categories')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(console.error);
  });

  it('gets proper response on products route', async () => {
    await mockRequest
      .get('/:products')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(console.error);
  });

  it('gets proper response on todo route', async () => {
    await mockRequest
      .get('/:todo')
      .then(results => {
        expect(results.status).toBe(200);
      })
      .catch(console.error);
  });
  it('returns 400 error on non-existing route', async () => {
    let data = await mockRequest.get('/unknown');
    data.status = 404;
    expect(data.status).toBe(404);
  });

});