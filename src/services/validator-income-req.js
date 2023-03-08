const Joi = require("joi");

// get json insert request schema
const insertSchema = Joi.object().keys({
  remark: Joi.string().required(),
  period: Joi.number().min(0).max(12).required(),
  protocol: Joi.valid("trojan", "vmess").required(),
  traffic: Joi.number().required(),
});

// Create many
/* 
details{
    numberOf: number,
    inputData :
    {
    "remark":"remarkpathname",
    "period":number 0-12,
    "protocol":"trojan",
    "traffic":number for gb 0 is unlimited
    }
}
*/
const createManyShema = Joi.object().keys({
  numberOf: Joi.number().min(1).required(),
  inputData: Joi.object({
    remark: Joi.string().required(),
    period: Joi.number().min(0).max(12).required(),
    protocol: Joi.valid("trojan", "vmess").required(),
    traffic: Joi.number().required(),
  }).required(),
});

// update data schema
const updateDataSchema = Joi.object().keys({
  remark: Joi.string().required(),
  period: Joi.number().min(0).max(12),
  traffic: Joi.number().min(1).max(100).required(),
});

// get json user data schema
const getDataSchema = Joi.object().keys({
  cname: Joi.string().required(),
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

// Check get user data json input validation
const getDataValid = async (indata) => {
  try {
    const value = await getDataSchema.validateAsync(indata);
    console.log(value);
    return value;
  } catch (err) {
    return err;
  }
};

// middleware for get user data validation
const middleGetDataValid = async (req, res, next) => {
  try {
    const validatedData = await getDataValid(req.body);
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

// check update account json input validation
const updateAccountValid = async (indata) => {
  try {
    const value = await updateDataSchema.validateAsync(indata);
    console.log(value);
    return value;
  } catch (err) {
    return err;
  }
};

// middleware check update account validation input json
const middleUpdateAccount = async (req, res, next) => {
  try {
    const validatedData = await updateAccountValid(req.body);
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

// Check Create many req structure
const createManyValide = async (indata) => {
  try {
    const value = await createManyShema.validateAsync(indata);
    console.log(value);
    return value;
  } catch (err) {
    return err;
  }
};
// middleware Create many
const middleCreateMany = async (req, res, next) => {
  try {
    const validatedData = await createManyValide(req.body);
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

module.exports = {
  middleInsValid,
  middleGetDataValid,
  middleUpdateAccount,
  middleCreateMany,
};
