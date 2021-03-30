import React, { useState, useEffect, Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { Route, BrowserRouter as Link, Router} from 'react-router-dom'
//import { HttpClient } from '../../../../shared/modules/httpClient/src/HttpClient'
import { useHistory } from 'react-router-dom';

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
        setInfo({
            email: email,
            passeord: password
        })
        try{
            setError('');
            if (!email || !password) {
                setError("enter an email and password! ");
            } else {
            //const token = await httpClient.post<Token>('http://localhost:3001/api/auth/logIn', {email: email, password: password}); 
            const token = 'try.the.token';
            localStorage.setItem('token', token);
            console.log(token);
            history.push({
                pathname: '/user',
                state: {email: email}});
            } 
        } catch (err) {
            setError(`${err}`);
        }
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
