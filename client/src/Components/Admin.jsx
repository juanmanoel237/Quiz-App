import React, { useEffect, useState } from 'react'
import "../Styles/Admin.css"
import axios from 'axios'

const Admin = () => {

    const [questions, setQuestions] = useState([])
    const [newQuestion, setNewQuestions] = useState('')
    const [newAnswers, setNewAnswers] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(()=>{
        const fetchQuestions = async ()=>{
            const res = await axios.get('http://localhost:5000/api/questions')
            setQuestions(res.data)
        }
        fetchQuestions()
    },[])
  return (
    <div>Admin</div>
  )
}

export default Admin