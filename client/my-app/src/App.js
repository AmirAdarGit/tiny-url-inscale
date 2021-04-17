import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              className="Typograpy"
              component={Link}
              to="/"
            >
              Tiny Url
            </Typography>
            <Button color="inherit" float="right" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" float="right" component={Link} to="/signup">
              Signup
            </Button>
            <Button className="logout-btn" component={Link} to="/">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login} to="/login"></Route>
        <Route path="/signup" exact component={Signup} to="/signup"></Route>
        <Route path="/user" exact component={User}></Route>
      </Router>
    </div>
  );
}

export default App;
