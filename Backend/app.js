const express = require("express");
const cors = require("cors");
const IndexRoutes = require("./src/routes/IndexRoutes");

const app = express();

/**
 * Configuración de Middlewares
 */

// CORS: Permitir peticiones desde el frontend (idealmente desde variable de entorno)
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3001",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Express Body Parser (Nativo desde v4.16+)
// Reemplaza a la librería externa 'body-parser'
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Rutas de la API
 */
// Toda la lógica se delega al IndexRoutes bajo el prefijo '/api'
// Ejemplo: /api/auth/login o /api/products/
app.use("/api", IndexRoutes);

/**
 * Manejo Global de Errores
 */

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    ok: false,
    message: "Endpoint no encontrado",
  });
});

// Exportar la instancia de la aplicación
module.exports = app;
