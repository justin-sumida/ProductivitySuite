import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import SignUp from './login/SignUp';
import Goals from './apps/Goals';
import Budget from './apps/Budget';
import { AuthProvider } from '../contexts/AuthContext';
import MainPage from './apps/MainPage';
import PasswordReset from './login/PasswordReset';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path= "/signup" component={SignUp} />
                </Switch>
                <Switch>
                    <Route path="/" exact component={Login} />
                </Switch>
                <Switch>
                    <Route path="/home" component={MainPage} />
                </Switch>
                <Switch>
                    <Route path="/goals" component={Goals} />
                </Switch>
                <Switch>
                    <Route path="/budget" component={Budget} />
                </Switch>
                <Switch>
                    <Route path="/forgot-password" component={PasswordReset} />
                </Switch>
            </AuthProvider>
        </Router>
    );
};

export default App;