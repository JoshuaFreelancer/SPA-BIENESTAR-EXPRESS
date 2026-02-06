const jwt = require("jsonwebtoken");

/**
 * Middleware to validate JWT token in headers
 */
const verifyToken = (req, res, next) => {
  // Obtenemos el token del encabezado personalizado
  const token = req.header("auth-token");

  // Validación 1: ¿Existe el token?
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Acceso denegado. No se proporcionó un token.",
    });
  }

  try {
    // Validación 2: ¿Es el token auténtico y no ha expirado?
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    // Inyectamos los datos del usuario (id, name, etc.) en la petición
    req.user = verified;

    // Continuamos con la siguiente función (el controlador)
    next();
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Token no válido o expirado.",
    });
  }
};

module.exports = verifyToken;
