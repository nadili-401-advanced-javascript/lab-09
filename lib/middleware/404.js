/* eslint-disable no-unused-vars */
'use strict';

/**
 * habdle 404 Error
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @return {object} error 
 */
module.exports = (req, res, next) => {
  let error = { error: 'Resource Not Found' };
  res
    .status(404)
    .json(error)
    .end();
};
