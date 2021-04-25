import React, { useState, useEffect } from "react";
import { Checkbox, TextField, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSelector, useDispatch, connect } from "react-redux";

import { useAppSelector, useAppDispatch } from '../redux/hooks'


import axios from "axios";
import "./User.css";
// import userId from "../redux/userIdSlice"
function User() {
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [button, setButton] = useState(false);

  const email = useAppSelector((state) => state.userId.value);
  const token = localStorage.getItem("jwt");

  const dispatch = useDispatch();

  console.log("Email ", email);
  console.log("Token ", token);

  const handleUrlChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleButtonChange = (e: any) => {
    e.preventDefault();
    console.log("button: ", button);
    setButton(!button);
  };

  const handleSubmit = (e: any) => {
    setError("");
    e.preventDefault();
    if (!url) {
      setError("Enter Url for the service");
    } else {
      console.log("Email ", email);
      console.log("Token ", token);

      axios({
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "post",
        url: "http://localhost:3001/api/url/createUrl",
        data: {
          longUrl: url,
          email: email,
          isPrivate: button,
        },
      })
        .then((response) => {
          setShortUrl(response.data.LinkId);
          console.log("user Short Url:", shortUrl);
        })
        .catch((error) => {
          console.log(JSON.stringify(error.response.data));
          setError(`${JSON.stringify(error.response.data)}`);
        });
    }
  };
  return (
    <div className="user">
      <h1>Hello {email}</h1>
      <br />
      <h3>Paste the URL to be shortened </h3>
      <form className="formClass" onSubmit={handleSubmit}>
        <TextField
          className="text-field"
          id="standard-basic"
          value={url}
          label="Enter the link here"
          onChange={handleUrlChange}
        />
        <br />
        <br />
        <br />
        <FormControlLabel
          control={<Checkbox checked={button} onChange={handleButtonChange} />}
          label="Private url (only you could convert the url to the original one)"
        />
        <br />
        <Button
          className="submit-btn"
          type="submit"
          style={{ border: "2px solid black" }}
        >
          Shorten URL
        </Button>
      </form>
      <div>{error && <h2>{error}</h2>}</div>
      <div>
        {shortUrl && (
          <div>
            <h4>{`http://localhost:3001/api/url/${shortUrl}`}</h4>
            <Button
              style={{ border: "2px solid black" }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:3001/api/url/${shortUrl}`
                );
              }}
            >
              click to copy the short url
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
