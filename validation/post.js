const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validatePostInput = data => {
  const errors = {};
  if (isEmpty(data.text)) {
    errors.text = "Text required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
