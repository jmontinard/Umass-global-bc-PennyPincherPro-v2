import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f5f5f5", padding: "20px 0", marginTop: "20px" }}>
      <Container>
        <Typography variant="body1" align="center" style={{ color: "#039BE5" }}>
          &copy; {new Date().getFullYear()} PennyPincherPro
        </Typography>
        <Typography variant="body2" align="center" style={{ color: "#039BE5", marginTop: "10px" }}>
          All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" style={{ color: "#039BE5", marginTop: "10px" }}>
          <Link to="/privacy-policy" style={{ color: "#039BE5", textDecoration: "none" }}>Privacy Policy</Link>
          {" | "}
          <Link to="/terms-of-service" style={{ color: "#039BE5", textDecoration: "none" }}>Terms of Service</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
