const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoiginInput = data => {
  const errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Email required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email format not valid";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
