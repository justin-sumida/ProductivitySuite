import React, {useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { useAuth } from '../../contexts/AuthContext';
import validator from 'validator';
import './Login.css';
const Login = () => {
    const emailRef = useRef();
    const passswordRef = useRef();
    const { login, setCurrentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
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

    const SignInWithFirebase = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((re) => {
            setCurrentUser(re.additionalUserInfo.profile.id);
            console.log(re);
            history.push('/home');
        })
        .catch((err) => {
            console.log(err);
        });
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
                        <button className="ui google button red" type="button" style={{marginBottom: 10}} onClick={SignInWithFirebase}>
                            <i className="google icon"/>
                            Sign In With Google</button>
                        <button type="submit" onClick={handleSubmit} className="ui fluid large grey submit button">Login</button>
                        <div style={{marginTop: 10}}>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
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