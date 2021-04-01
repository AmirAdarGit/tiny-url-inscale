import React, { useState, useEffect } from 'react'
import Radio from '@material-ui/core/Radio';
import { Checkbox, TextField, Button }  from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useParams, Route } from 'react-router-dom';

function User() {
    
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    //const [email, setEmail] = useState(props.location.state.email);
    const [url, setUrl] = useState('');
    const [button, setButton] = useState(false);
    //console.log("the email is:", email);



    
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
        try{
            if(!url){
                setError("Enter Url for the service");
            }
            //const shortUrl = await httpClient.post<Token>('http://localhost:3001/api/auth/logIn', {longUrl: url, email: email, isPrivate: privateLink}); 
            setShortUrl("tinyUrlInScale/4");
            console.log("user Short Url:", shortUrl);
        } catch (err) {
            setError(`${error}`)
        }
    }

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
            </div>\
        </div>
    )
}

export default User
