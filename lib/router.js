/* eslint-disable no-unused-vars */
'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);
const router = express.Router();

// if request is sent to the /model route, the modelFinder.load function is executed
router.param('model', modelFinder.load);

/**
 * Root route - prints "Homepage"
 * @route GET /
 * @security basicAuth
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {string} 200 - 'Homepage'
 * @returns {Error}  500 - Server error
 */
router.get('/', (req, res, next) => {
  res.send('Homepage');
});

/**
 * @route GET '/models'
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @security basicAuth
 * @returns {200} -- success 
 * @returns {object} models
 * @returns {Error}  500 - Server error
 */
router.get('/models', (req, res, next) => {
  modelFinder.list().then(models => res.status(200).json(models));
});

/** 
 * @route GET /:model/schema
 * @security basicAuth
 * @returns {200} - Successful connection
 * @returns {jsonSchema}
 */
router.get('/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

/**
 * @route GET /:model
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.get('/:model', handleGetAll);

/**
 * @route POST /:model
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.post('/:model', handlePost);


/**
 * @route GET /:model/:id
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.get('/:model/:id', handleGetOne);

/**
 * @route PUT /:model/:id
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.put('/:model/:id', handlePut);

/**
 * @route DELETE /:model/:id
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.delete('/:model/:id', handleDelete);

/**
 * @function handleGetAll()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handleGetAll(req, res, next) {
  req.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

/**
 * @function handleGetOne()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handleGetOne(req, res, next) {
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

/**
 * @function handlePost()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handlePost(req, res, next) {
  req.model
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * @function handlePut()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handlePut(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * @function handleDelete()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handleDelete(req, res, next) {
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
