const Joi = require("joi");
const insertValidation = require("../validations/connection.validation");

// const validate = (schema) => (req, res, next) => {
//   const validSchema = pick(schema, ['params', 'query', 'body']);
//   const object = pick(req, Object.keys(validSchema));
//   const { value, error } = Joi.compile(validSchema)
//     .prefs({ errors: { label: 'key' }, abortEarly: false })
//     .validate(object);

//   if (error) {
//     const errorMessage = error.details.map((details) => details.message).join(', ');
//     return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
//   }
//   Object.assign(req, value);
//   return next();
// };

// module.exports = validate;

const valide = (schema) => async (req, res, next) => {
  const validatedData = await insertValidation(req.body);

  const valide = await schema.validateAsync(req.body);
  if (valide.details) {
    const error = validatedData.details[0].message;
    res.status(501).send(error);
  } else {
    req.valide = valide;
    next();
  }
};

// const valide = (validSchema) => (req, res, next) => {
//   const { value, error } = Joi.valid(validSchema);

//   if (error) {
//     const errorMessage = error.details;
//     res.status(402).send(errorMessage);
//   }

//   return next();
// };

// const valide = (schema) => (req, res, next) => {
//   try {
//     const validatedData = insertValidation(req.body);
//     const valide = schema.validateAsync(req.body);
//     if (!valide.details) {
//       req.valide = valide;
//       next();
//     } else {
//       res.status(500).send(validatedData.details[0].message);
//     }
//   } catch (err) {
//     return err.message;
//   }
// };

module.exports = valide;
