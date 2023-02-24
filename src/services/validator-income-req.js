const Joi = require("joi");

const insertSchema = Joi.object().keys({
  remark: Joi.string().required(),
  period: Joi.number().max(12).required(),
  protocol: Joi.valid("trojan", "vmess").required(),
  traffic: Joi.number().required(),
});

// use joi to validate income json
const insertValidation = async (indata) => {
  try {
    const value = await insertSchema.validateAsync(indata);
    console.log(value);
    return value;
  } catch (err) {
    return err;
  }
};

// use middleware path to works joi in middleware
const middleInsValid = async (req, res, next) => {
  try {
    const validatedData = await insertValidation(req.body);
    if (!validatedData.details) {
      req.validatedData = validatedData;
      next();
    } else {
      res.status(500).send(validatedData.details[0].message);
    }
  } catch (err) {
    return err.message;
  }
};

module.exports = { middleInsValid };
