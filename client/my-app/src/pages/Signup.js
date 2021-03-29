import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react'




function Signup() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({
        userName: '',
        email: '',
        password: ''
    })

    const submit = (e) => {
        e.preventDefault();
        
        setUserInfo({
            userName: userName,
            email: email,
            password: password     
        })
        console.log(userInfo);

        // TODO: cheack valid input properties 
    }
    
    const updateUserName = (e) => {
        e.preventDefault();
        setUserName(e.target.value)
        console.log(e.target.value);
    }
    const updateSetEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
        console.log(e.target.value);
    }
    const updateSetPasseord = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
        console.log(e.target.value);
    }
    

    return (
        <div>
            <h1>signup</h1>
            <form className="formClass" onSubmit={submit}>
                <TextField id="standard-basic" value={userName} label="User Name" onChange={updateUserName}/><br/>
                <TextField id="standard-basic" value={email} label="Email" onChange={updateSetEmail}/><br/>
                <TextField id="standard-basic" value={password}label="Password" onChange={updateSetPasseord}/><br/>
                <button type="submit">Submit</button>
            </form>
 
        </div>
    )
}

export default Signup
