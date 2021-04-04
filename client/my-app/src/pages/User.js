import React, { useState, useEffect } from 'react'
import { Checkbox, TextField, Button }  from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useParams, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import  getToken  from '../redux/tokenSlice';
import  getId  from '../redux/userIdSlice';

function User() {
    
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [url, setUrl] = useState('');
    const [button, setButton] = useState(false);

    const token = useSelector(state => state.userToken.value);
    const email = useSelector(state => state.userId.value);

    const dispatch = useDispatch();

    console.log("Email ", email);
    console.log("Token ", token);
    

    const handleUrlChange = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setUrl(e.target.value);
    }

    const handleButtonChange = (e) => {
        e.preventDefault();
        console.log("button: ", button)
        setButton(!button);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            if(!url){
                setError("Enter Url for the service");
            } else {
                console.log("Email ", email);
                console.log("Token ", token);

                axios({
                    headers: { 
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    method: 'post',
                    url: 'http://localhost:3001/api/url/createUrl',
                    data: {
                        'longUrl': url,
                        'email': email,
                        'isPrivate': button
                    }
                }).then((response) => {
                    setShortUrl(response.data.value);
                    console.log("user Short Url:", shortUrl);
                }).catch((error) => {
                    console.log(JSON.stringify(error.response.data));
                    setError(`${JSON.stringify(error.response.data)}`);
                })
            }
        }
        
    




    // http://localhost:3001/api/url/createUrl
    // Content-Type: application/json
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhc2lsaXNreUBnbWFpbC5jb20iLCJpYXQiOjE2MTI5NTY1Njl9.ui8tjpxTCJ437HeM3nFLw9obzej7_sfdMKvl36ZfkAc
    
    // {
    //     "LongURL": "https://www.tal-king-22222243315aaffrd111/search?q=%D7%A9%D7%90%D7%99%D7%9C%D7%AA%D7%94+%D7%91%D7%A8%D7%91%D7%99%D7%9D+%D7%AA%D7%A8%D7%92%D7%95%D7%9D&rlz=1C1SQJL_enUS782US782&oq=%D7%A9%D7%90%D7%99%D7%9C%D7%AA%D7%94+%D7%91%D7%A8%D7%91%D7%99%D7%9D+%D7%AA%D7%A8%D7%92%D7%95%D7%9D&aqs=chrome..69i57.10279j1j1&sourceid=chrome&ie=UTF-8",
    //     "Email": "vasilisky@gmail.com",
    //     "IsPrivate": true
    // }




    return (
        <div>
            <h1>User</h1><br/>
            <h3>Please enter the your URL you want to be shorten </h3>
            <form className="formClass" onSubmit={handleSubmit}>
                <TextField id="standard-basic" value={url} label="Url" onChange={handleUrlChange}/><br/><br/><br/>
                <FormControlLabel
                    control={<Checkbox checked={button} onChange={handleButtonChange} />}
                    label="Private url (only you could convert the url to the original one)"
                />
                <br/>
                <Button type="submit">Submit</Button>
            </form>
            <div>{error && <h2>{error}</h2>}</div>
            <div>{shortUrl && 
                <div>
                    <h1>{shortUrl}</h1>
                    <Button onClick={() => {navigator.clipboard.writeText(shortUrl)}}>
                        click to copy the short url
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default User
