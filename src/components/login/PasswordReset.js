import React, {useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import validator from 'validator';
import './Login.css';

const PasswordReset = () => {
    const emailRef = useRef();
    const { passwordReset } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validator.isEmail(emailRef.current.value)){
            setError("Invalid email address.");
        }
        try {
            setError("");
            setMessage("")
            await passwordReset(emailRef.current.value);
            setMessage("Email was sent to " + emailRef.current.value + " please follow the instructions from the email.");
        } catch {
            setError("Failed to send email.");
        }
    }

    const determineMessage = () => {
        if(message){
            return <div className="ui positive message">{message}</div>
        }
        return null;
    }
    return (
        <div className="ui center aligned middle aligned grid" style={{height:'100vh'}}>
            <div className="column">
                <h2 className="ui image header">
                    <div className="content">
                        Reset your password
                    </div>
                </h2>
                <form onSubmit={handleSubmit} className="ui large form error">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon" />
                                <input type="text" ref={emailRef} placeholder="E-mail address" />
                            </div>
                        </div>
                        <button type="submit" onClick={handleSubmit} className="ui fluid large blue submit button">Reset Password</button>
                        <div style={{marginTop: 10}}>
                            <Link to="/">Sign In</Link>
                        </div>
                    </div>
                    <div className="ui error message">{error}</div>
                    {determineMessage()}
                </form>
                <div className="ui message">
                    New to us? 
                    <Link to="/signup"> Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;