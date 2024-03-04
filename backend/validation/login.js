const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
data.email = !Validator.isEmpty(data.email) ? data.email : "";
data.password = !Validator.isEmpty(data.password) ? data.password : "";


  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
  errors,
  isValid: Object.keys(errors).length === 0, // Check if errors object is empty
};
};
