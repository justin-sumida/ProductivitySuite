import React, {useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import validator from 'validator';
import './Login.css';
const Login = () => {
    const emailRef = useRef();
    const passswordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    async function handleSubmit(e) {
        //e.preventDefault();
        if (!validator.isEmail(emailRef.current.value)){
            setError("Invalid email address.");
        }
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passswordRef.current.value);
            history.push('/home');
        } catch {
            setError("Failed to log in. Username and password combination not found.");
        }
    }
    return (
        <div className="ui center aligned middle aligned grid" style={{height:'100vh'}}>
            <div className="column">
                <h2 className="ui image header">
                    <div className="content">
                        Login to your account
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
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon" />
                                <input type="password" ref={passswordRef} placeholder="Password" />
                            </div>
                        </div>
                        <div onClick={handleSubmit} className="ui fluid large grey submit button">Login</div>
                    </div>
                    <div className="ui error message">{error}</div>
                </form>
                <div className="ui message">
                    New to us? 
                    <Link to="/signup"> Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;