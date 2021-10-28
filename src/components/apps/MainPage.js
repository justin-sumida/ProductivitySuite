import React from "react";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";
import ToDo from './ToDo';
const MainPage = () => {
    const { currentUser } = useAuth();
    console.log(currentUser._delegate);
    if (currentUser){
        return (
            <div className="ui container">
                <Header></Header>
                <div>{`Welcome, ${currentUser ? currentUser._delegate.email : 'loading'}`}</div>
                <ToDo />
            </div>
        );
    }
    else {
        return (
            <div className="ui error message">
                <div className="header">
                    Insufficient Permissions.
                </div>
                <p>Looks like you're not logged in, so you can't access anything here. Please login to access your information!</p>
            </div>
        );
    }
};

export default MainPage;