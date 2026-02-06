const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

/**
 * ESQUEMAS DE VALIDACIÓN (Joi)
 */

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

/**
 * CONTROLADORES
 */

// REGISTRO DE USUARIO
const register = async (req, res) => {
  // 1. Validar datos de entrada
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });
  }

  // 2. Verificar si el email ya existe
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res
      .status(400)
      .json({
        ok: false,
        message: "El correo electrónico ya está registrado.",
      });
  }

  // 3. Encriptar contraseña (Hash)
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  // 4. Crear usuario
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({
      ok: true,
      message: "Usuario registrado exitosamente",
      data: savedUser, // El modelo User.js se encarga de no devolver el password aquí
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

// INICIO DE SESIÓN (LOGIN)
const login = async (req, res) => {
  // 1. Validar datos de entrada
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });
  }

  // 2. Verificar si el usuario existe
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ ok: false, message: "Usuario no encontrado" });
  }

  // 3. Verificar contraseña
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ ok: false, message: "Contraseña incorrecta" });
  }

  // 4. Crear Token JWT
  // Incluimos ID y nombre en el token para usarlos en el frontend
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" },
  ); // El token expira en 1 día

  // 5. Enviar respuesta con Token
  res.header("auth-token", token).json({
    ok: true,
    message: "Bienvenido",
    data: { token, user }, // Enviamos el usuario para mostrar su nombre en la barra de navegación
  });
};

module.exports = {
  register,
  login,
};
