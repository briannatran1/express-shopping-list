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
//TODO: test submitting empty body
describe('POST /items', function () {
  it('Create item and add to items array', async function () {
    let bananas = { name: "bananas", price: 4 };

    const resp = await request(app)
      .post('/items')
      .send(bananas);

    // items.push(bananas);

    // expect(items.length).toEqual(2);
    expect(resp.body).toEqual(
      {
        added: {
          name: "bananas",
          price: 4
        }
      });
  });
});

describe('GET /items/:name', function () {
  it('Returns a single item from the items array', async function () {
    const resp = await request(app).get(`/items/${cherries.name}`);
    expect(resp.body).toEqual({ name: "cherries", price: 40 });
  });
  it("Responds with 404 if item does not exist", async function () {
    const resp = await request(app).get('/items/apples');
    expect(resp.statusCode).toEqual(404);
  });
});
//TODO: could test patching incomplete info
describe('PATCH /items/:name', function () {
  it('Returns a modified item', async function () {
    const resp = await request(app)
      .patch(`/items/${cherries.name}`)
      .send({
        price: 60
      });
    expect(resp.body).toEqual({
      updated: {
        name: "cherries",
        price: 60
      }
    });
  });
});

describe('DELETE /items/:name', function () {
  it('Deletes an item from the items array', async function () {
    const resp = await request(app).delete(`/items/${cherries.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    // expect(items.length).toEqual(0);
  });
});
