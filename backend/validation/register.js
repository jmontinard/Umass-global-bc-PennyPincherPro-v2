const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

 
// Convert empty fields to an empty string so we can use validator functions
data.name = !Validator.isEmpty(data.name) ? data.name : "";
data.email = !Validator.isEmpty(data.email) ? data.email : "";
data.password = !Validator.isEmpty(data.password) ? data.password : "";
data.password2 = !Validator.isEmpty(data.password2) ? data.password2 : "";


  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  } else if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0, // Check if errors object is empty
  };
};
