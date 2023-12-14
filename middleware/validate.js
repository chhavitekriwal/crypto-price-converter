const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); 

const validate = (req, res, next) => {

  const schema = Joi.object({
    fromCurrency: Joi.string().required(),
    toCurrency: Joi.string().required(),
    date: Joi.date().format("DD-MM-YYYY").max("now").required(),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

module.exports = validate;
