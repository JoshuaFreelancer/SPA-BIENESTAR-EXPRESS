const router = require('express').Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken')

/* Esquemas de Validación */
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const bcrypt = require('bcrypt');

/* Ruta register */
router.post('/register', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    /* Comprobar que el Email este disponible para registrar usuario */
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            { error: 'El Email está registrado' }
        )
    }

    /* Cifrado de contraseña */
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

/* Ruta login */
router.post('/login', async (req, res) => {

    const { error } = schemaLogin.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Email/Contraseña no válida' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Email/Contraseña no válida' })

    /* Firma del token */
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET);
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    });
});

module.exports = router;