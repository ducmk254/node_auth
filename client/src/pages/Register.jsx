import React,{useState,useEffect} from 'react';
import './Register.css';
import {NavLink} from 'react-router-dom';
const Register = ({history}) => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.pushState("/")
        }
    },[history])
    const registerHandle = async (e)=>{
        e.preventDefault();

        try {
            
        } catch (error) {
            
        }
    }

    return (

        <div className="register min-width">
            <h3 className="register__title">Register</h3>
            <form onSubmit={registerHandle}>
                <div className="register__group">
                    <label htmlFor="username" className="register__label">Username:</label>
                    <input value={username} required type="text" className="register__input" id="username" placeholder="Username ..." onChange={(e)=>setUsername(e.target.value)} />
                </div> 
                <div className="register__group">
                    <label htmlFor="email" className="register__label">Email:</label>
                    <input value={email} required type="text" className="register__input" id="email" placeholder="Email ..." onChange={(e)=>setEmail(e.target.value)} />
                </div>                
                <div className="register__group">
                    <label htmlFor="password" className="register__label">Password:</label>
                    <input value={password} required type="password" className="register__input" id="password" placeholder="Password ..." onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="register__group">
                    <label htmlFor="confirmpassword" className="register__label">Confirm Password:</label>
                    <input value={confirmpassword} required type="password" className="register__input" id="confirmpassword" placeholder="Confirm password ..." onChange={e=>setConfirmpassword(e.target.value)} />
                </div>
                <div className="register__group">
                    <button type="submit" className="register__btn">Register</button>
                </div>
                <div className="register__group">
                    <span className="register__item">Already have an account? <NavLink className="register__link" to="/login">Login</NavLink></span>
                </div>
            </form>
        </div>
    );
};

export default Register;