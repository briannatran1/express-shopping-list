const express = require('express');

// don't need?
// const db = require('./fakeDb');
const router = new express.Router();

const { items } = require('./fakeDb');
const { NotFoundError } = require('./expressError');

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

  return res.json(foundItem);
});

/** PATCH /items/:name: accepts JSON body, updates item and returns it */
router.patch('/:name', function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name);

  if (!foundItem) {
    throw new NotFoundError();
  }

  foundItem.name = req.body.name || foundItem.name;
  foundItem.price = req.body.price || foundItem.price;

  return res.json(
    {
      updated: {
        name: foundItem.name,
        price: foundItem.price
      }
    });
});

/** DELETE /items/:name: deletes item*/
router.delete('/:name', function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name);

  if (!foundItem) {
    throw new NotFoundError();
  }

  const foundItemIdx = items.indexOf(foundItem);
  items.splice(foundItemIdx, 1);

  return res.json(
    {
      message: "Deleted"
    }
  );
});

module.exports = router;
