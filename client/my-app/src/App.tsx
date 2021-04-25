import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

import { Route, BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { setId } from "./redux/userIdSlice"

function App() {
  const email = useAppSelector((state) => state.userId.value);
  const dispatch = useAppDispatch()

  const clearUserId = () => {
    dispatch(setId(""));
  }

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
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit"  component={Link} to="/signup">
              Signup
            </Button>
            
            {email && <Button className="logout-btn" component={Link} to="/" onClick={clearUserId}>
              Logout
            </Button>}

          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/user" exact component={User}></Route>
      </Router>
    </div>
  );
}

export default App;
