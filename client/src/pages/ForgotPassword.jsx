import React,{useState,useEffect} from 'react';
import './ForgotPassword.css';
import axios from 'axios';
const ForgotPassword = ({history}) => {
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    },[history])
    const forgotpasswordHandle = async (e)=>{
        e.preventDefault();
        const headers = {
            "Content-Type":"application/json"
        }

        try {
            await axios.post("http://127.0.0.1:5000/api/auth/forgotpassword",{email},headers);
            
            history.push("/login");
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000);
        }
    }

    return (

        <div className="forgotpw min-width">
            <h3 className="forgotpw__title">Forgot password</h3>
            {error && <span className="error-message">{error}</span>}
            <form onSubmit={forgotpasswordHandle}>
            <div className="forgotpw__group">
                    <label  htmlFor="password" className="forgotpw__label">Email:</label>
                    <input value={email} required type="text" className="forgotpw__input" id="password" placeholder="Email ..." onChange={e=>setEmail(e.target.value)} />
                </div>               

                <div className="forgotpw__group">
                    <button type="submit" className="forgotpw__btn">Reset Password</button>
                </div>
                
            </form>
        </div>
    );
};

export default ForgotPassword;