import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {
    const {logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){
        try {
            await logout();
            history.push('/');
        }
        catch {
            console.log('error!');
        }
    }

    return (
        <div className="ui secondary  menu">
            <Link to="/home" className="active item">
            Home
            </Link>
            <Link to="/goals" className="item">
                Goals
            </Link>
            <Link to="/budget" className="item">
                Budget
            </Link>
            <div className="right menu">
                <div className="item">
                </div>
                <a onClick={handleLogout} className="ui item">
                Logout
                </a>
            </div>
        </div>
    );
}

export default Header;