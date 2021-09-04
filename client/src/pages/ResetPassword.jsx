import React,{useState,useEffect} from 'react';
import './ResetPassword.css';
import axios from 'axios';
const ResetPassword = ({history}) => {
    const [confirmpassword,setConfirmPassword] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    },[history])
    const resetpasswordHandle = async (e)=>{
        e.preventDefault();
        const headers = {
            "Content-Type":"application/json"
        }
        if(password !== confirmpassword){
            setError("Password and confirm password don't match !");
            setTimeout(()=>{
                setError("");

            },5000)
        }
        try {
            const {data} = await axios.put("http://127.0.0.1:5000/api/auth/resetpassword/:resetToken",{password},headers);

            localStorage.setItem("authToken",data.token);
            history.push("/");
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000);
        }
    }

    return (

        <div className="resetpassword min-width">
            <h3 className="resetpassword__title">reset password</h3>
            {error && <span className="error-message">{error}</span>}
            <form onSubmit={resetpasswordHandle}>
            <div className="resetpassword__group">
                    <label  htmlFor="password" className="resetpassword__label">Password:</label>
                    <input value={password} required type="password" className="resetpassword__input" id="password" placeholder="Password ..." onChange={e=>setPassword(e.target.value)} />
                </div>               
                <div className="resetpassword__group">
                    <label  htmlFor="password" className="resetpassword__label">Confirm Password:</label>
                    <input value={confirmpassword} required type="password" className="resetpassword__input" id="password" placeholder="Confirm Password ..." onChange={e=>setConfirmPassword(e.target.value)} />
                </div>
                <div className="resetpassword__group">
                    <button type="submit" className="resetpassword__btn">Reset Password</button>
                </div>
                
            </form>
        </div>
    );
};

export default ResetPassword;