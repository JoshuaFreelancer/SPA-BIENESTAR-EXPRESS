const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuración de Cloudinary
// El SDK de Cloudinary detecta automáticamente la variable CLOUDINARY_URL
cloudinary.config();

// Configuración del almacenamiento en la nube
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "BienestarExpress/Products", // Carpeta donde se guardarán las fotos
    allowed_formats: ["jpg", "png", "webp", "jpeg"], // Formatos permitidos
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optimización automática al subir
  },
});

/**
 * Middleware de Multer configurado con almacenamiento en la nube
 */
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB por imagen para no saturar
});

module.exports = upload;
