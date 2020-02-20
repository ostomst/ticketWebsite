const Joi = require("@hapi/joi");

//Validation Register
const registerValidation = data => {
  const schema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    name: Joi.string()
      .alphanum()
      .required()
      .min(3),
    phone: Joi.string()
      .min(8)
      .max(12)
  };
  return Joi.validate(data, schema);
};

//Validation Login
const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
