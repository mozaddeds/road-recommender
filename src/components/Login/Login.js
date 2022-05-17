import React, { useContext, useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

import { facebookSignIn, handleGoogleSignIn, initializeFirebase, signIn, signUp } from './LoginManagement';


initializeFirebase();

const Login = () => {

    const [newUser, setNewUser] = useState(false)

    const [user, setUser] = useState({
        isAssigned: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        isFieldValid: false
    });

    let problems;

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            isFieldValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
        }
        if (isFieldValid === true) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value;
            newUserInfo.isFieldValid = isFieldValid;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (user.email && user.password && user.isFieldValid) {
            if (newUser) {
                signUp(user.name, user.email, user.password)
                    .then(res => {
                        setUser(res);
                        setLoggedInUser(res);
                        history.replace(from);
                    })
            }

            else if (!newUser) {
                signIn(user.email, user.password)
                    .then(res => {
                        user.isAssigned = true;
                        setUser(res);
                        setLoggedInUser(res);
                        history.replace(from);
                    })
            }

        }
        event.preventDefault();
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const fbSignIn = () => {
        facebookSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    


    return (
        <div className="d-flex flex-column loginForm">
            <form onSubmit={handleSubmit} action="">

                {newUser && <input onBlur={handleBlur} name="name" id="nameField" type="text" placeholder="Type your name" required />}

                <input onBlur={handleBlur} name="email" id="emailField" type="text" placeholder="Type your email" required />

                <input onBlur={handleBlur} name="password" id="passwordField" type="password" placeholder="Type your password" required />

                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUserCheck" />

                <label id="newUserLabel" html for="newUser">New Here?</label>

                <div className="d-flex flex-column">
                    <button className="btn btn-success btn-lg m-3">Submit</button>

                    <button onClick={googleSignIn} className="btn signInOptions btn-outline-warning btn-lg m-3">Sign in with Google</button>

                    <button onClick={fbSignIn} className="btn signInOptions btn-outline-info btn-lg m-3">Sign in with Facebook</button>
                </div>
            </form>
        </div>
    );
};

export default Login;