import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"

function Signup() {

    const history = useHistory();
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({
        userName: '',
        email: '',
        password: ''
    })

    const handleFromSubmit = (e) => {
        e.preventDefault();
        
        setUserInfo({
            userName: userName,
            email: email,
            password: password     
        })

        if(!email || !userName || !password){
            setError("enter an email and password and user name! ");
            return;
        } 

        axios({
            headers: { 
                'content-type': 'application/json'
            },
            method: 'post',
            url: 'http://localhost:3001/api/auth/signUp',
            data: {
                email: email,
                name: userName,
                password: password
            }
        }).then(() => {
            history.push("/login");
        }).catch((error) => {
            console.log(JSON.stringify(error.response.data));
            setError(`${JSON.stringify(error.response.data)}`);
        })


    }
    
    const handleUserName = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
    }
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }
    

    return (
        <div>
            <h1>signup</h1>
            <form className="formClass" onSubmit={handleFromSubmit}>
                <TextField id="standard-basic" value={userName} label="User Name" onChange={handleUserName}/><br/>
                <TextField id="standard-basic" value={email} label="Email" onChange={handleEmailChange}/><br/>
                <TextField id="standard-basic" value={password}label="Password" onChange={handlePasswordChange}/><br/>
                <Button type="submit">Submit</Button>
            </form>
            <div>{error && <h2>{error}</h2>}</div>
        </div>
    )
}

export default Signup
