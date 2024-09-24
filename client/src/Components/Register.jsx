import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../Styles/Register.css"

const Register = () => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e)=>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:5000/api/auth/register', {username, password})
            navigate('/login')
        }
        catch(error){
            setError(error.response?.data?.message || 'Une erreur est survenue.');
        }
    }
  return (
    <div className='register-container'>
        <h2>Inscription</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleRegisterSubmit}>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>setUserName(e.target.value)} required />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register