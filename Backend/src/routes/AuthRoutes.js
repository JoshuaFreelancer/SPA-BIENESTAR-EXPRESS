const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

/**
 * RUTAS DE AUTENTICACIÓN (API/USER)
 */

// Registrar un nuevo usuario (POST /api/user/register)
router.post("/register", AuthController.register);

// Iniciar sesión (POST /api/user/login)
router.post("/login", AuthController.login);

module.exports = router;
