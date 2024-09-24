// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = ({ isAdmin, handleLogout }) => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAdmin ? (
                    <li><Link to="/admin">Admin Panel</Link></li>
                ) : (
                    <li><Link to="/quiz">Quiz</Link></li>
                )}
                <li><Link to="/login">{isAdmin ? 'Logout' : 'Login'}</Link></li>
                {!isAdmin && <li><Link to="/register">Register</Link></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
