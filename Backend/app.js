const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

// Importar Rutas
const authRoutes = require("./src/routes/auth.js");
const prodsRoutes = require("./src/routes/productos.js");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// Express ya incluye su propio body-parser, pero mantenemos esta estructura si la prefieres
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

// Rutas
app.use("/api/user", authRoutes);
app.use("/api/productos", prodsRoutes);

// Exportar la configuración de la app
module.exports = app;
