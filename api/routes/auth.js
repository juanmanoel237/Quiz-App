const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async (req, res)=>{
    try{
        const {username, password} = req.body
        const existingUser = await User.findOne({username})
        if(existingUser) return res.status(400).json({message:"Ce nom d'utilisateur existe déjà"})

        const hashedPssword = await bcrypt.hash(password, 10)    

        //Vérifier si c'est le premier utilisateur pour le rôle ADMIN
        const isFirstUser = (await User.countDocuments()) === 0
        const newUser = new User({
            username,
            password: hashedPssword,
            isAdmin: isFirstUser // Le premier inscrit devient admin
        })

        await newUser.save()
        res.status(201).json({message:"Utilisateur créé avec succès"})
    }
    catch(error){
        res.status(500).json({ message: 'Server error' });
    }
})