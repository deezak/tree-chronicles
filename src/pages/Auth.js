import React, { useState } from 'react';
import '../../src/styles.scss';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
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
    if(!signUp){
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
    else{
        if(password !== confirmPassword){
            return toast.error("Passwords don't match");
        }
        if(firstName && lastName && email && password){
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {displayName: `${firstName} ${lastName}`});
            setActive("home");
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
            <div className = "col-12 text-center">
                {!signUp ? "Sign In" : "Sign Up"}

            </div>
        </div>
        <div className='row h-100 justify-content-center align-items-center'> 
        <div className='col-10 col-md-8 col-lg-6' style={{width: "70%"}}>
            <form className='row' onSubmit={handleAuth}>
                {signUp && (
                    <>
                        <div className='col-6 py-3'>  
                            <input type="firstName" 
                            className='form-control input-text-box'
                            placeholder='First Name'
                            name="firstName"
                            value={firstName}
                            onChange={handleChange} 
                            />
                        </div>
                        <div className='col-6 py-3'>  
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
                <div className='col-12 py-3'>  
                    <input type="email" 
                    className='form-control input-text-box'
                    placeholder='Email'
                    name="email"
                    value={email}
                    onChange={handleChange} 
                    />
                </div>
                <div className='col-12 py-3'>  
                    <input type="password" 
                    className='form-control input-text-box'
                    placeholder='Password'
                    name="password"
                    value={password}
                    onChange={handleChange} 
                    />
                </div>
                {signUp &&(
                    <div className='col-12 py-3'>  
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
                    {/* <div className="text-center justify-content-center mt-2 pt-2">
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                            Don't have an account?&nbsp;&nbsp;
                            <span className="link-danger" style={{textDecoration:"none", cursor:"pointer"}}
                            onClick={() => setSignUp(true)}>
                                Sign Up
                            </span>
                        </p>
                    </div> */}
                    </>
                ): (
                    <>
                       <div className="text-center justify-content-center mt-2 pt-2">
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                            Already have an account?&nbsp;&nbsp;
                            <span className="link-danger" style={{textDecoration:"none", cursor:"pointer", color: "#C85A42"}}
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