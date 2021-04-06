import React from 'react'
import Button from '@material-ui/core/Button';
import { Route, BrowserRouter as Router, Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Simple and fast URL shortener!</h1>
                <br></br>
            <div>

                <p>ShortURL allows to reduce long links from Instagram, Facebook, YouTube, Twitter, Linked In and top sites on the Internet.<br></br>
                    just paste the long URL and click the Shorten URL button.
                </p>
                <br></br>
                <p>First Signup and create new user account, if you have an acount just loged in.<br></br>

                    <p>Enjoy!</p>
                </p>
            </div>
        </div>
    )
}

export default Home
