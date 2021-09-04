import React,{useState,useEffect} from 'react';
import './Login.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
const Login = ({history}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    },[history])
    const loginHandle = async (e)=>{
        e.preventDefault();
        const headers = {
            "Content-Type":"application/json"
        }

        try {
            const {data} = await axios.post("http://127.0.0.1:5000/api/auth/login",{email,password},headers);

            localStorage.setItem("authToken",data.token);
            history.push("/");

        } catch (err) {
            // console.log(err.response.data.status);
            setError(err.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000);
        }
    }

    return (

        <div className="login min-width">
            <h3 className="login__title">Login</h3>
            {error && <span className="error-message">{error}</span>}
            <form onSubmit={loginHandle}>
                <div className="login__group">
                    <label htmlFor="email" className="login__label">Email:</label>
                    <input value={email} required type="text" className="login__input" id="email" placeholder="Email ..." onChange={(e)=>setEmail(e.target.value)} />
                    </div>                
                <div className="login__group">
                    <label  htmlFor="password" className="login__label">Password: <NavLink className="login__link" to="/forgotpassword">Forgot Password?</NavLink></label>
                    <input value={password} required type="password" className="login__input" id="password" placeholder="Password ..." onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="login__group">
                    <button type="submit" className="login__btn">Login</button>
                </div>
                <div className="login__group">
                    <span className="login__item">Don't have an account ? <NavLink className="login__link" to="/register">Register</NavLink></span>
                </div>
            </form>
        </div>
    );
};

export default Login;