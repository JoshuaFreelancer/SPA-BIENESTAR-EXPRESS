const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const verifyToken = require("../middlewares/ValidateToken");
const upload = require("../middlewares/MulterConfig"); // El nuevo middleware

/**
 * RUTAS DEL INVENTARIO
 */

// Obtener productos
router.get("/", ProductController.getAllProducts);

// Crear producto (Inyectamos 'upload.single' entre el token y el controlador)
// 'img' es el nombre del campo que debe venir desde el formulario de React
router.post(
  "/",
  verifyToken,
  upload.single("img"),
  ProductController.createProduct,
);

// Actualizar producto
router.put(
  "/:id",
  verifyToken,
  upload.single("img"),
  ProductController.updateProduct,
);

// Eliminar producto
router.delete("/:id", verifyToken, ProductController.deleteProduct);

module.exports = router;
