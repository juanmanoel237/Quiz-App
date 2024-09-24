import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./Components/Quiz";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  // Gérer l'état d'authentification et du statut admin
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (token, adminStatus) => {
    localStorage.setItem("token", token); // Stocker le token lors de la connexion
    setIsAuthenticated(true); // Activer l'authentification
    setIsAdmin(adminStatus); // Définir le statut admin
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token à la déconnexion
    setIsAuthenticated(false); // Désactiver l'authentification
    setIsAdmin(false); // Désactiver le statut admin
  };

  return (
    <div>
      <Router>
        <Navbar
          isAdmin={isAdmin}
          handleLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          
          {/* Route protégée pour le Quiz */}
          <Route
            path="/quiz"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Quiz />
              </PrivateRoute>
            }
          />
          
          {/* Route protégée pour l'Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAdmin}>
                <Admin />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<h2>Bienvenue sur Quiz App! Veuillez vous connecter pour accéder au jeu ou créer un compte si ce n'est pas déjà fait.</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
