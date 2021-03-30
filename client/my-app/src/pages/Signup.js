import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


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
        console.log(userInfo);
        //const response = await httpClient.post<void>('http://localhost:3001/api/auth/signUp', {email: email, name: userName, password: password}); 
        // TODO: cheack valid input properties 
        try{

            if(!email || !userName || !password){
                console.log("error on of them")
                setError("enter an email and password and user name! ");
            } else {
                console.log("not error")
                history.push("/login");
            }
        } catch (err){
            setError(`${error}`);
        }
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
