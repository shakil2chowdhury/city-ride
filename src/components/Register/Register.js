import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import "./Register.css"

import firebaseConfig from '../firebase.config'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserContext } from '../../App';

const Register = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
      });

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }



    const handleFacebookLogin = () => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(facebookProvider).then(function (result) {
            var user = result.user;
            console.log(user)
            user.success = true;
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    const handleGoogleLogin = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    const createUserWithEmailAndPassword = (name, email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch( error => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
     }

    return loggedInUser.email ? (<h1 className="logged-msg">You Are Already Logged In!!</h1>) : 
    (
        <div className="register-body">
            <div className="register-top">
                <div>Existing User?</div>
                <Link to="/login"><Button variant="contained" color="primary">
                    Login
                    </Button>
                </Link>
            </div>
            <form onSubmit={() => createUserWithEmailAndPassword(user.name, user.email, user.password)}>
                <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <input type="password" name="password2" onBlur={handleBlur} placeholder="Confirm Password" required />
                <br />
                <input type="submit" className="btn btn-primary" />
            </form>
            <br />
            <FacebookLoginButton onClick={handleFacebookLogin} />
            <GoogleLoginButton onClick={handleGoogleLogin} />
        </div>
    );
};

export default Register;