const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateEducationInput = data => {
  const errors = {};
  if (isEmpty(data.title)) {
    errors.title = "Title required";
  }
  if (isEmpty(data.from)) {
    errors.from = "Starting date required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
