// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = ({ isAdmin, handleLogout, isAuthenticated }) => {
    return (
        <nav className="navbar">
            <ul>
               <li><Link to='/'>Home</Link></li>
               {isAuthenticated && <li><Link to='/quiz'>Quiz</Link></li>}
               {isAdmin && <li><Link to='/admin'>Admin Panel</Link></li>}
               {!isAuthenticated ? (
                <li><Link to="/login">Login</Link></li>
               ) : (
                <li><button onClick={handleLogout}>Logout</button></li>
               )}
               <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
