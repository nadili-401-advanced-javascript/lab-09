/* eslint-disable no-unused-vars */
'use strict';

/**
 * handle 500 error
 * @param  {object} err
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res
    .status(500)
    .json(error)
    .end();
};
