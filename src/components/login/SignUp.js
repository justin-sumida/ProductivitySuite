import React, {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import validator from 'validator';
import './Login.css';
const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirm = useRef();
    const { signup } = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");
    console.log(error);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validator.isEmail(emailRef.current.value)){
            setError("Invalid email address.");
        }

        else if (passwordRef.current.value !== passwordConfirm.current.value) {
            setError("Passwords must match.");
        }

        else if(passwordRef.current.value.length < 6){
            setError("Password must be at least 6 characters long.")
        }
        else {
            try {
                setError("");
                await signup(emailRef.current.value, passwordRef.current.value);
                history.push('/home');
            } catch {
                console.log("error!");
            }
        }
    }

    return (
        <div className="ui center aligned middle aligned grid" style={{height:'100vh'}}>
            <div className="column">
                <h2 className="ui image header">
                    <div className="content">
                        Create an account
                    </div>
                </h2>
                <form className="ui large form error">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon" />
                                <input type="text" placeholder="E-mail address" ref={emailRef}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon" />
                                <input type="password" placeholder="Password" ref={passwordRef}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon" />
                                <input type="password" placeholder="Confirm Password" ref={passwordConfirm}/>
                            </div>
                        </div>
                        <div onClick={handleSubmit} className="ui fluid large grey submit button">Login</div>
                    </div>
                    <div className="ui error message active">{error}</div>
                </form>
                <div className="ui message">
                    Have an account?
                    <Link to="/"> Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;