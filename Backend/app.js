const express = require("express");
const cors = require("cors");
const IndexRoutes = require("./src/routes/IndexRoutes");

const app = express();

/**
 * Configuración de Middlewares
 */

// 🚀 Lista estricta de dominios permitidos leídos del .env
const allowedOrigins = [
  process.env.CLIENT_URL_DEV,     
  process.env.CLIENT_URL_PREVIEW,  
  process.env.CLIENT_URL_PROD,     
  process.env.CLIENT_URL_PROD_ALT  
].filter(Boolean);

// 🛡️ CORS a prueba de balas (Nivel Producción)
app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Permitir peticiones sin 'origin' (útil para pruebas en Postman)
      if (!origin) return callback(null, true);

      // 2. Verificar si el origen está en nuestra lista VIP
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // 3. Si falla, registramos exactamente qué URL intentó entrar en los logs de Render
        console.error(`🚨 CORS bloqueó la petición desde: ${origin}`);
        callback(new Error("Acceso denegado por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // Vital si en algún momento usas cookies o sesiones
  })
);

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