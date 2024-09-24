import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Quiz from "./Components/Quiz"
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Admin from './Components/Admin';

function App() {

  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const handleLogin = (token, isAdmin) =>{
    localStorage.setItem('token', token)
    setToken(token)
    setIsAdmin(isAdmin)
  }

  const handleLogout = ()=>{
    localStorage.removeItem(token)
    setToken(null)
    setIsAdmin(false)
  }

  return (
    <div>
      <Navbar isAdmin={isAdmin} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/quiz' element={token ? <Quiz/> : <Navigate to="/login" />}/>
        <Route path='/admin' element={isAdmin ? <Admin/> : <Navigate to="/login"/>}/>
        <Route path='/' element={<Navigate to="/quiz"/>}/>
      </Routes>
    </div>
  );
}

export default App;
