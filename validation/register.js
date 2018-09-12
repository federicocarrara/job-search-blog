const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = data => {
  const errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name between 2 and 20 characters";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email format not valid";
  }
  if (isEmpty(data.name)) {
    errors.name = "Name required";
  }
  if (isEmpty(data.email)) {
    errors.email = "Email required";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password required";
  }
  if (isEmpty(data.password2)) {
    errors.password2 = "Password verification required";
  }
  if (!validator.matches(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
