import React,{useState,useEffect} from 'react';
import axios from "axios";
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
            history.push("/");
        }
    },[history]);

    const registerHandle = async (e)=>{
        e.preventDefault();
        // tao header
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        // check password va confirmpassword nhap vao
        if(password !== confirmpassword){
            setPassword("");
            setConfirmpassword("");
            setTimeout(()=>{
                setError(""); // sau 5s thi set error la ""
            },5000); 
            return setError("Password do not match!");
        }

        // neu password === confirmpassword thi lam tiep:
        try {
            const {data} = await axios.post("http://127.0.0.1:5000/api/auth/register",{username,email,password},config);
            console.log(data); // data = {status,token}
            // set authToken
            localStorage.setItem("authToken",data.token);
            history.push("/");
            // console.log(" thanh cong ")
        } catch (err) {
            console.log(err);
            //set gia tri cho state: error de show ra canh bao
            setError(err.response.data.error);
            setTimeout(()=>{ // sau 5s thi set error ve ""
                setPassword("");
                setConfirmpassword("");
                setError("");
            },5000);
        }
        
    }

    return (

        <div className="register min-width">
            <h3 className="register__title">Register</h3>
            {error && <span className="error-message">{error}</span>}
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