const Joi = require("joi");

// get json insert request schema
const createSchema = Joi.object().keys({
  remark: Joi.string().required(),
  period: Joi.number().max(12).required(),
  protocol: Joi.valid("trojan", "vmess").required(),
  traffic: Joi.number().required(),
});

// update data schema
const updateSchema = Joi.object().keys({
  remark: Joi.string().required(),
  period: Joi.number().min(0).max(12).required(),
  traffic: Joi.number().min(1).max(100).required(),
});

// get json user data schema
const getDataSchema = Joi.object().keys({
  cname: Joi.string().required(),
});

module.exports = { createSchema, updateSchema, getDataSchema };
