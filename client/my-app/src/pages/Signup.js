import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const history = useHistory();

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFromSubmit = (e) => {
    e.preventDefault();

    if (!email || !userName || !password) {
      setError("enter an email and password and user name! ");
      return;
    }
    const userInfo = {
      userName: userName,
      email: email,
      password: password,
    };
    axios({
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      url: "http://localhost:3001/api/auth/signUp",
      data: {
        email: email,
        name: userName,
        password: password,
      },
    })
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        console.log(JSON.stringify(error.response.data));
        setError(`${JSON.stringify(error.response.data)}`);
      });
  };

  const handleUserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="sign-up">
      <h1>signup</h1>
      <form className="formClass" onSubmit={handleFromSubmit}>
        <TextField
          id="standard-basic"
          value={userName}
          label="User Name"
          onChange={handleUserName}
        />
        <br />
        <TextField
          id="standard-basic"
          value={email}
          label="Email"
          onChange={handleEmailChange}
        />
        <br />
        <TextField
          id="standard-basic"
          value={password}
          label="Password"
          onChange={handlePasswordChange}
        />
        <br />
        <Button className="submit-btn" type="submit">
          Submit
        </Button>
      </form>
      <div>{error && <h2>{error}</h2>}</div>
    </div>
  );
}

export default Signup;
