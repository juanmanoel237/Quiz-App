const express = require('express')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt')
const User = require('../models/User') 
const router = express.Router() 

// Route d'inscription
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body

        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ username })
        if (existingUser) return res.status(400).json({ message: "Ce nom d'utilisateur existe déjà" })

        // Hachage du mot de passe avec bcrypt (niveau de salage de 10)
        const hashedPassword = await bcrypt.hash(password, 10)

        // Vérifier si c'est le premier utilisateur créé (pour lui attribuer un rôle admin)
        const isFirstUser = (await User.countDocuments()) === 0  // Si aucun utilisateur dans la base, c'est le premier
        const newUser = new User({
            username,
            password: hashedPassword,
            isAdmin: isFirstUser  // Le premier utilisateur devient administrateur
        })

        // Sauvegarde du nouvel utilisateur dans la base de données
        await newUser.save()
        res.status(201).json({ message: "Utilisateur créé avec succès" })
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' })
    }
})

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: "Nom d'utilisateur invalide" })

        // Comparaison du mot de passe fourni avec celui enregistré (haché)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Mot de passe invalide" })

        // Générer un token JWT pour l'utilisateur connecté
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },  // Payload du token : ID utilisateur et rôle admin
            process.env.JWT_SECRET
        )

        // Retourner le token JWT dans la réponse
        res.json(token)
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' })
    }
})

module.exports = router
