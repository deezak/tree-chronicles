import React, { useState } from 'react';
import '../../src/styles.scss';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
// import { getFunctions, httpsCallable } from 'firebase/functions';
import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

const initialState = {
    firstName: "",
    lastName:"",
    email: "",
    password: "",
    confirmPassword:""
}

const Auth = ({setActive, setUser}) => {
    const [state, setState] = useState(initialState);
    const [signUp, setSignUp] = useState(false);
    const {email, password, firstName, lastName, confirmPassword} = state;
    const navigate = useNavigate();
const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
    
}

const handleAuth = async(e) => {
    e.preventDefault();
    if(!signUp){ //signing in
        if (email && password) {
            const { user } = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            setUser(user);
            setActive("home");
        }
    }
    else{//signing up
        
        if(password !== confirmPassword){
            return toast.error("Passwords don't match");}
        if(firstName && lastName && email && password){
            
            try{
                const approvedUsersRef = collection(db, "approvedUsers");
                const q = query(approvedUsersRef, where("email", "==", email));
                const querySnapshot = await getDocs(q);
                console.log("APPROVED USERS: " + querySnapshot);
                if (!querySnapshot.empty) {//if(result.data.exists) {
                    const {user} = await createUserWithEmailAndPassword(auth, email, password);
                    await updateProfile(user, {displayName: `${firstName} ${lastName}`});
                    console.log('Sign-up successful:', user);
                    
                // Optionally log the user in or redirect
                setUser(user);
                console.log("ROUTING TO HOME");
                setActive("home");
                } 
                

            } catch (error){
                console.error('Error checking email:', error.message);
                return false;
            }
        
        }
        else{
            return toast.error("All fields must be filled");
        }
    }
    navigate("/"); 
}
    

  return (
    <div className='login container-fluid mb-4'>
        <div className="">
            <div className = "col-12 text-center" style={{fontFamily: 'cutout', fontSize:"2em"}}>
                {!signUp ? "Sign In" : "Sign Up"}

            </div>
        </div>
        <div className='row justify-content-center align-items-start'> 
        <div className='col-10 col-md-8 col-lg-6' style={{width: "70%"}}>
            <form className='row' onSubmit={handleAuth}>
                {signUp && (
                    <>
                        <div className='col-6 py-2'>  
                            <input type="firstName" 
                            className='form-control input-text-box'
                            placeholder='First Name'
                            name="firstName"
                            value={firstName}
                            onChange={handleChange} 
                            />
                        </div>
                        <div className='col-6 py-2'>  
                            <input type="lastName" 
                            className='form-control input-text-box'
                            placeholder='Last Name'
                            name="lastName"
                            value={lastName}
                            onChange={handleChange} 
                            />
                        </div>
                    </>
                )}
                <div className='col-12 py-2'>  
                    <input type="email" 
                    className='form-control input-text-box'
                    placeholder='Email'
                    name="email"
                    value={email}
                    onChange={handleChange} 
                    />
                </div>
                <div className='col-12 py-2'>  
                    <input type="password" 
                    className='form-control input-text-box'
                    placeholder='Password'
                    name="password"
                    value={password}
                    onChange={handleChange} 
                    />
                </div>
                {signUp &&(
                    <div className='col-12 py-2'>  
                        <input type="password" 
                        className='form-control input-text-box'
                        placeholder='Confirm Password'
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange} 
                        />
                    </div>
                )}
                
                <div className="col-12 py-3 text-center">
                    <button className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`} type="submit">
                        {!signUp ? "SIGN IN" : "SIGN UP"}
                    </button>
                </div>
            </form>
            <div>
                {!signUp ? (
                    <>
                    <div className="text-center justify-content-center">
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                            Don't have an account?&nbsp;&nbsp;
                            <span  style={{textDecoration:"none", cursor:"pointer", color: "var(--navyBlue)"}}
                            onClick={() => setSignUp(true)}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                    </>
                ): (
                    <>
                       <div className="text-center justify-content-center">
                        <p className="small fw-bold mb-0">
                            Already have an account?&nbsp;&nbsp;
                            <span style={{textDecoration:"none", cursor:"pointer", color: "var(--navyBlue)"}}
                            onClick={() => setSignUp(false)}>
                                Sign In
                            </span>
                        </p>
                    </div> 
                    </>
                )}
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default Auth;