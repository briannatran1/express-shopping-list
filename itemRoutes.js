const express = require('express');

// don't need?
// const db = require('./fakeDb');
const router = new express.Router();

const { items } = require('./fakeDb');
const { NotFoundError } = require('../express-router-middleware-demo/routing/expressError');

/** GET /items: get list of items */
router.get('/', function (req, res) {
  return res.json(items);
});

/** POST /items: accepts JSON body, adds item, and returns it */
router.post('/', function (req, res) {
  const body = req.body;

  items.push(body);

  return res.json(
    {
      added: {
        name: body.name,
        price: body.price
      }
    });
});

/** GET /items/:name: return a single item */
router.get('/:name', function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name);

  if (!foundItem) {
    throw new NotFoundError();
  }

  console.log(items);
  return res.json(foundItem);
});

module.exports = router;