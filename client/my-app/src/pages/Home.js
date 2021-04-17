import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Simple and fast URL shortener!</h1>
      <br></br>
      <div className="home-content">
        ShortURL allows to reduce long links from Instagram, Facebook, YouTube,
        Twitter, Linked In and top sites on the Internet.<br></br>
        just paste the long URL and click the Shorten URL button.
        <br></br>
        First Signup and create new user account, if you have an acount just
        loged in.<br></br>
        <p>Enjoy!</p>
      </div>
    </div>
  );
}

export default Home;
