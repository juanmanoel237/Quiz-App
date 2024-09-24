// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = ({ isAdmin, handleLogout, isAuthenticated }) => {
    return (
        <nav className="navbar">
            <ul>
               <li><Link to='/'>Home</Link></li>

               {/* Afficher le lien Quiz seulement si l'utilisateur est authentifié */}
               {isAuthenticated && <li><Link to='/quiz'>Quiz</Link></li>}

               {/* Afficher le lien Admin Panel seulement si l'utilisateur est admin */}
               {isAdmin && <li><Link to='/admin'>Admin Panel</Link></li>}

               {/* Afficher le bouton Login ou Logout selon l'état d'authentification */}
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
