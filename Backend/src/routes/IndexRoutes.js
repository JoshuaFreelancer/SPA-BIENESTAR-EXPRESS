const express = require("express");
const router = express.Router();

// Importación de rutas individuales
const AuthRoutes = require("./AuthRoutes");
const ProductRoutes = require("./ProductRoutes");

/**
 * Definición de prefijos para las rutas de la API
 */

// Rutas de autenticación (Login/Registro) -> /api/auth
router.use("/auth", AuthRoutes);

// Rutas de inventario (Fármacos) -> /api/products
router.use("/products", ProductRoutes);

module.exports = router;
