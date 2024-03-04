
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import PropTypes from 'prop-types';
import { useAuth } from "../../utils/AuthContext";
import classnames from "classnames";

const Login = () => {
  const { isAuthenticated, loginError, loginUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {

      navigate("/dashboard");
    }
    if (loginError) {
      setFormErrors(loginError);
    }
  }, [isAuthenticated, loginError, navigate]);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(userData); // Call the loginUser function from the AuthContext

      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setFormErrors(err.response.data); // Set form errors from the response data
      }
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={userData.email}
                error={formErrors.email || formErrors.emailnotfound}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: formErrors.email || formErrors.emailnotfound,
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">
                {formErrors.email || formErrors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={userData.password}
                error={formErrors.password || formErrors.passwordincorrect}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: formErrors.password || formErrors.passwordincorrect,
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {formErrors.password || formErrors.passwordincorrect}
              </span>
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
// };

export default Login;
