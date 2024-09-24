import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Quiz from "./Components/Quiz";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import PrivateRoutes from "./Components/PrivateRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (token, adminStatus) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <Router>
        <Navbar
          isAdmin={isAdmin}
          handleLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
        <Switch>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoutes
            path="/quiz"
            component={Quiz}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoutes
            path="/admin"
            component={Admin}
            isAuthenticated={isAdmin}
          />
          <Route path="/">
            <h2>Bienvenue sur Quiz App!</h2>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
