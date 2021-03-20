import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import React, { useContext } from 'react';
import './Login.css'
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import firebaseConfig from '../firebase.config'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserContext } from "../../App";


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber =  /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        // if(isFieldValid){
        //   const newUserInfo = {...user};
        //   newUserInfo[e.target.name] = e.target.value;
        //   setUser(newUserInfo);
        // }
      }
    // const handleSubmit = (e) => {
    //     if(newUser && user.email && user.password){
    //       createUserWithEmailAndPassword(user.name, user.email, user.password)
    //       .then(res => {
    //         handleResponse(res, true);
    //       })
    //     }
    // }

    const handleFacebookLogin = () => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
        var user = result.user;
        console.log(user)
        user.success = true;
        const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    const handleGoogleLogin = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    return (
            <div className="login-body">
                <div className="login-top">
                    <div>New User?</div>
                    <Link to="/register"><Button variant="contained" color="primary">
                        Register Now
                    </Button>
                    </Link>
                </div>
                    <form>
                        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
                        <br />
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                        <br />
                        <input type="submit" className="btn btn-primary" />
                    </form>
                    <br />
                    <FacebookLoginButton onClick={handleFacebookLogin} />
                    <GoogleLoginButton onClick={handleGoogleLogin} />
            </div>
    );
};

export default Login;