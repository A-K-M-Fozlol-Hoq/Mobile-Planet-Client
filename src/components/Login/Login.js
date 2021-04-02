import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import './Login.css';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
import firebase from "firebase/app";

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    // to save user input before validation
    const [inputFields, setInputFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('')
    const [check, setCheck] = useState({error:''})
    // to save info about user
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        password: '',
        email: '',
        photo: '',
        error: '',
        success: false
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }




    // const signOut = () => {
    //     setLoggedInUser({})
    //     // setUser({})
    // }


    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            storeAuthToken();
            history.replace(from)
        }
    }

    const storeAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            // console.log(idToken);
            sessionStorage.setItem('token',idToken)
            history.replace(from)
          }).catch(function(error) {
            // Handle error
          });
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'first_name') {
            if (event.target.value.length > 1 && event.target.value.length < 10) {
                isFieldValid = /^[a-z ,.'-]+$/i.test(event.target.value);
                if(isFieldValid){
                    setError('')
                    inputFields.firstName = event.target.value;
                    if (inputFields.lastName){
                        user.name = inputFields.firstName + " "+ inputFields.lastName;
                    }
                }
                else{
                    setError('Enter valid first Name')
                }
            }
            else{
                setError('The length of your first name should be between 2 and 9')
            }
        }
        else if (event.target.name === 'last_name') {
            if (inputFields.firstName) {
                if (event.target.value.length > 1 && event.target.value.length < 10) {
                    isFieldValid = /^[a-z ,.'-]+$/i.test(event.target.value);
                    if(isFieldValid){
                        setError('')
                        inputFields.lastName = event.target.value;
                    }
                    else{
                        setError('Enter valid last Name')
                    }
                }
                else{
                    setError('The length of your last name should be between 2 and 9')
                }
            }
            else {
                setError('Please enter a valid first name before enter lastname')
            }
        }
        else if (event.target.name === 'email') {
            // for sign up
            if (isNewUser) {
                if (inputFields.firstName && inputFields.lastName) {
                    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
                    if (isFieldValid) {
                        setError('')
                        inputFields.email = event.target.value;
                        user.email = event.target.value;
                    }
                    else {
                        setError('Please Enter a valid email')
                    }
                }
                else {
                    setError('Please enter a valid first name and last name before enter email')
                
                }
            }
            // for sign in
            else {
                isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
                if (isFieldValid) {
                    setError('')
                    inputFields.email = event.target.value;
                }
                else {
                    setError('Please Enter a valid email')
                }
            }

        }
        else if (event.target.name === 'password') {
            if (inputFields.email) {
                if (event.target.value.length > 6 && event.target.value.length < 50) {
                    isFieldValid = /\d{1}/.test(event.target.value);
                    if (isFieldValid) {
                        setError('')
                        inputFields.password = event.target.value;
                    }
                    else {
                        setError('Your password should contain at least one number')
                    }
                }
                else {
                    setError('The length of your password should be between 7 and 49')
                }
            }
            else {
                setError('Please enter name and email proprtly before enter password')
            }
        }
        else if (event.target.name === 'confirm_password') {
            if (inputFields.password) {
                inputFields.confirmPassword = event.target.value;
                if (inputFields.password === inputFields.confirmPassword) {
                    const newUserInfo = { ...user }
                    newUserInfo.name = inputFields.firstName + ' ' + inputFields.lastName;
                    newUserInfo.email = inputFields.email;
                    newUserInfo.password = inputFields.password;
                    setUser(newUserInfo);
                    setError('')
                }
                else {
                    setError('Confirm Password is not matching with password')
                }
            }
            else {
                setError('Please Enter first name Or Reload the page')
            }
        }
        // Only for sign in
        if (event.target.name === 'password') {
            if (!isNewUser && isFieldValid) {
                const newUserInfo = { ...user }
                newUserInfo.email = inputFields.email;
                newUserInfo.password = inputFields.password;
                setUser(newUserInfo);
            }
        }

    }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNewUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    if(res.success === false){
                        alert('This email address is already used by another account')
                    }
                    handleResponse(res, true)
                })
        }
        if (!isNewUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // console.log(res)
                    if(res.success === false){
                        // setCheck('UserName or Password is not matching')
                        // console.log(res.success, check)
                        alert('UserName or Password is not matching')
                        setCheck({error:'UserName or Password is not matching'})
                    }else{
                        
                    handleResponse(res, true)
                    }
                })
        }
    }


    return (
        <div>
            <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>{error}</p>
            <div className="login">
                <form className='form' onSubmit={handleSubmit}>
                    <input onChange={() => setIsNewUser(!isNewUser)}
                        type="checkbox" name="isNewUser" id="isNewUser" />
                    <label htmlFor="isNewUser">New User Sign Up</label>
                    <br />
                    {
                        isNewUser &&
                        <>
                            <label htmlFor="last_name">First Name</label>
                            <input onBlur={handleBlur} type="text" id="last_name"
                                name="first_name" placeholder="Your First Name.."></input>

                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" onBlur={handleBlur} id="last_name"
                                name="last_name" placeholder="Your Last Name.."></input>
                        </>
                    }

                    <label htmlFor="email">Email</label>
                    <input type="email" onBlur={handleBlur} id="email"
                        name="email" placeholder="abc@gmail.com"></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" onBlur={handleBlur} id="password"
                        name="password" placeholder="password"></input>

                    {
                        isNewUser &&
                        <>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" onBlur={handleBlur} id="confirm_password"
                                name="confirm_password" placeholder="Confirm Password"></input>
                        </>}

                    <input type="submit" value={isNewUser ? 'Sign Up' : 'Sign In'}></input>
                </form>
                <h4 className='div'>Or</h4>
                <div className="social-media">
                    <button onClick={googleSignIn} className='google btn' onClick={googleSignIn}>Sign In With Google</button>
                </div>
            </div>
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                </div>
            }
            <p>{check.error}</p>
            <p style={{ color: 'red' }}>{user.error}</p>
            { user.success && <p style={{ color: 'green' }}>user {isNewUser ? 'Created' : 'Logged In'} successfully ---- {loggedInUser.name}</p>}
        </div>
    );
};


export default Login;