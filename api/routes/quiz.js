const express = require('express')
const jwt = require('jsonwebtoken')
const Question = require('../models/Question')
const router = express.Router()

// Middleware de protection des routes d'admin

function authenticatAdmin (req, res, next){
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({message:"Accès interdit"})

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded.isAdmin) return res.status(403).json({message: "Admin uniquement"})
        
        next()
    }
    catch(error){
        res.status(403).json({message: "Token invalide"})
    }    
}

// Ajout de question
router.post('/add', authenticatAdmin, async (req, res)=>{
    try{
        const {question, options, correctAnswer} = req.body
        const newQuestion = new Question({ question, options, correctAnswer })
        await newQuestion.save()
        res.status(201).json({message: "Question ajouté"})
    }
    catch(error){
        res.status(500).json({ message: 'Erreur serveur' });
    }
})

router.delete('/delete/:id', authenticatAdmin, async (req, res)=>{
    try{
        await Question.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Question supprimée"})
    }
    catch(error){
        res.status(500).json({message:"Erreur serveur"})
    }
})

router.get('/all', async (req, res)=>{
    try{
        const questions = await Question.find()
        res.json(questions)
    }
    catch(error){
        res.status(500).json({message: "Erreur serveur"})
    }
})

module.exports = router;