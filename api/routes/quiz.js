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