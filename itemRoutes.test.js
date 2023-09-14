const request = require('supertest');

const app = require('./app');

let { items } = require('./fakeDb');

let cherries = { name: "cherries", price: 40 };

beforeEach(function () {
  items.push(cherries);
});

afterEach(function () {
  items = [];
});

describe('GET /items', function () {
  it('Get a list of the items', async function () {
    const resp = await request(app).get('/items');

    expect(resp.body).toEqual([{ name: "cherries", price: 40 }]);
  });
});

describe('POST /items', function () {
  it('Create item and add to items array', async function () {
    let bananas = { name: "bananas", price: 4 };

    const resp = await request(app)
      .post('/items')
      .send(bananas);

    items.push(bananas);

    expect(items.length).toEqual(2);
    expect(resp.body).toEqual(
      {
        added: {
          name: "bananas",
          price: 4
        }
      });
  });
});