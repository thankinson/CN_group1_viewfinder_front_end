import React from 'react';
import { useState, useEffect } from 'react';
import { createUser, login, tokenLogin } from '../utils/index';
import { Navigate } from 'react-router-dom';

// This Login needs to be passed a setUser from root app.jsx
// App.jsx should check current user state and either root to here
// or homepage

export const Login = ({ user, setUser }) => {
    // Set username, email, password hooks
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    // This switches between log in or sign up render
    const [bool, setBool] = useState(false);

    // Try a token login
    useEffect( () => {
        try {
            tokenLogin(setUser);
        } catch (error) {
            console.log(error);
        }
    }, [])

    // Runs on form submit
    const submitHandler = (event => {
        // Prevent a refresh on form submit
        event.preventDefault();
        // Log in user
        if (bool) {
            login(username, pass, setUser);
        }
        // Create account for new user 
        else {
            // !! This needs a decent email checker. Maybe regex.
            if (email) {
                createUser(username, email, pass, setUser);
            }
        }
    })

    return (
        <div className="login-container">
            { user && <Navigate to="/home" /> }
            { bool ? <h3>log in</h3> : <h3>sign up</h3> }
            <form className="login-form" onSubmit={submitHandler}>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder='username'
                />
                <br></br>
                {!bool && <input
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='email'
                />} <br></br>
                <input
                    onChange={(event) => setPass(event.target.value)}
                    placeholder='password'
                /> <br></br>
                <button className='submit-button' type='submit'>submit</button>
            </form>

            { bool ? 
                <p>Click <a className="login-bool" onClick={() => setBool(!bool)}>here</a> to sign up!</p>
                : <p>Already have an account? Click <a className='login-bool' onClick={() => setBool(!bool)}>here</a> to log in!</p>
            }
        </div>
    )
}
