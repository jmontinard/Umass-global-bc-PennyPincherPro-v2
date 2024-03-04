import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Navbar = () => {
  return (
    <div>
      <AppBar position="fixed" color="default">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                fontFamily: "monospace",
                fontWeight:"bold",
                // color: "",
                textDecoration: "none",
              }}
              component={Link}
              to="/"
            >
              PennyPincherPro
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
