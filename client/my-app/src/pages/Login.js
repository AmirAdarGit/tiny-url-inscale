import React, { useState, useEffect, Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { Route, BrowserRouter as Link, Router} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import axios from "axios"

function Login() {
    const history = useHistory();
    //const httpClient = new HttpClient();
    
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState({
        email: '',
        password: ''
    });
    const [jwt, setJwt] = useState('');

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }    
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError("enter an email and password! ");
        }
        
        setInfo({
            email: email,
            passeord: password
        })
        
        axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: 'http://localhost:3001/api/auth/logIn',
            data: {
                email: email,
                password: password
            }
        }).then((response) => {
            console.log(response.data);
            
            history.push("/user");
        }).catch((error) => {
            console.log(JSON.stringify(error.response.data));
            setError(`${JSON.stringify(error.response.data)}`);
        })

            // localStorage.setItem('token', token);
            // console.log(token);
            // history.push({
            //     pathname: '/user',
            //     state: {email: email}});
            // } 
    }
    

    return (
        <div>
            <h1>Login</h1>
            <form className="formClass" onSubmit={handleSubmit}>
                <TextField id="standard-basic" value={email} label="Email" onChange={handleEmailChange}/><br/>
                <TextField id="standard-basic" value={password} label="Password" onChange={handlePasswordChange}/><br/>
                <Button type="submit">Submit</Button>
            </form>
            
            <div>{error && <h2>{error}</h2> }</div>

        </div>

    )
}

export default Login
