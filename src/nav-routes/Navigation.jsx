import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './Navigation.css';

// This is my Navigation component. It displays the navigation bar at the top of the page. It shows different links depending on whether the user is logged in or not. The buttons change based on the user's role: user, admin, or not logged in. I also colored the Admin button red to make it stand out for an admin when they are logged in. 

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/employees">Team Members</NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/skills">Skills Needed</NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
            {currentUser.isadmin && (
                <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/admin"style={{ color: 'red' }}>Admin</NavLink>
                </li>
            )}
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}> Log out {currentUser.firstname || currentUser.username} </Link>
            </li>
            </ul>
        );
    }

    function loggedOutNav() {
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">Log in</NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">Sign up</NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">KFG Help!</Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}


export default Navigation;