import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Header = (props) => {
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
        <div className="ui secondary menu">
            <Link to="/home" className={`${props.link === 'todo' ? 'active' : ''} item`}>
            Home
            </Link>
            <Link to="/goals" className={`${props.link === 'goals' ? 'active' : ''} item`}>
                Goals
            </Link>
            <Link to="/budget" className={`${props.link === 'budget' ? 'active' : ''} item`}>
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