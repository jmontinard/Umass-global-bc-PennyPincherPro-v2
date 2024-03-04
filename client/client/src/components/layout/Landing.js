import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import creditCardImage from "../../assets/images/p3CreditCards.png";
import { Container, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/system";

const MyContainer = styled(Container)({
  height: "75vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const MyImage = styled("img")({
  width: "350px",
  maxWidth: "100%",
  margin: "auto",
});

const MyTypography = styled(Typography)({
  fontSize: "h4.fontSize", 
});

const MyButton = styled(Button)({
  width: "140px",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  fontSize: "1.8rem",
  margin: "1.2rem",
  border: "1px solid #333",
  transition: "border-color 0.3s ease", 
  "&:hover": {
    borderColor: "#039BE5", 
  },
});

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <MyContainer>
    <Grid container justify="center">
      <Grid item xs={12} md={6} className="center-align">
        <MyImage src={creditCardImage} alt="Credit Card" />
        <MyTypography variant="h4" className="flow-text">
          <b style={{ fontFamily: "monospace", color: "#039BE5" }}>Welcome to PennyPincherPro</b>, your ultimate personal finance companion powered by the <span style={{ fontFamily: "monospace", color: "#039BE5" }}><b>Plaid</b></span> Api.
        </MyTypography>
        <Grid container justify="center">
          <MyButton as={Link} to="/register" variant="contained" color="primary">
            Register
          </MyButton>
          <MyButton as={Link} to="/login" variant="outlined" color="primary">
            Log In
          </MyButton>
        </Grid>
      </Grid>
    </Grid>
  </MyContainer>
  );
};

export default Landing;
