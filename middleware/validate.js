const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');
const Joi = JoiBase.extend(JoiDate);
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validate = (req, res, next) => {
  const schema = Joi.object({
    fromCurrency: Joi.string().required(),
    toCurrency: Joi.string().required(),
    date: Joi.date().format('DD-MM-YYYY').max('now').required(),
  });

  const {error} = schema.validate(req.query);

  if (error) {
    const errorMessage = error.details.map(details => details.message).join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

module.exports = validate;
