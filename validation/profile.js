const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = data => {
  const errors = {};
  if (isEmpty(data.handle)) {
    errors.handle = "handle required";
  }
  if (isEmpty(data.status)) {
    errors.status = "status required";
  }
  if (isEmpty(data.skills)) {
    errors.skills = "skills required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
