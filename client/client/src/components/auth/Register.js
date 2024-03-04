import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import classnames from "classnames";

const Register = () => {
  const { isAuthenticated, registrationError, registerUser } = useAuth();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [formErrors, setFormErrors] = useState({}); // New state for form errors
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
   
      navigate("/dashboard");
    }
    // Reset form errors when registrationError changes
    if (registrationError) {
      setFormErrors(registrationError);
    } else {
      // Clear form errors if no registration error
      setFormErrors({});
    }
  }, [isAuthenticated, registrationError, navigate]);

  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await registerUser(newUser, navigate);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={newUser.name}
                error={formErrors.name ? true : false} // Use ternary operator to set error prop
                id="name"
                type="text"
                className={classnames("", {
                  invalid: formErrors.name ? true : false, // Use ternary operator to set invalid class
                })}
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{formErrors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={newUser.email}
                error={formErrors.email ? true : false} // Use ternary operator to set error prop
                id="email"
                type="email"
                className={classnames("", {
                  invalid: formErrors.email ? true : false, // Use ternary operator to set invalid class
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{formErrors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={newUser.password}
                error={formErrors.password ? true : false} // Use ternary operator to set error prop
                id="password"
                type="password"
                className={classnames("", {
                  invalid: formErrors.password ? true : false, // Use ternary operator to set invalid class
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{formErrors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={newUser.password2}
                error={formErrors.password2 ? true : false} // Use ternary operator to set error prop
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: formErrors.password2 ? true : false, // Use ternary operator to set invalid class
                })}
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{formErrors.password2}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
