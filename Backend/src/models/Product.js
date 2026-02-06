const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Elimina espacios accidentales al inicio/final
      minlength: 3,
      maxlength: 255,
      index: true, // Optimiza búsquedas por nombre en miles de registros
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true, // Optimiza el filtrado por categorías en el inventario
    },
    // Agregamos marca o laboratorio, esencial en una farmacéutica
    brand: {
      type: String,
      trim: true,
      default: "Genérico",
    },
    stock: {
      type: Number,
      required: true,
      min: 0, // Un fármaco puede estar en 0 (agotado)
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Estructura para manejo profesional de imágenes (Cloudinary/S3)
    img: {
      url: {
        type: String,
        default: "https://via.placeholder.com/150", // Imagen por defecto si no hay subida
      },
      public_id: {
        // ID único en la nube para poder borrar o actualizar la foto después
        type: String,
        default: null,
      },
    },
  },
  {
    // Crea automáticamente campos 'createdAt' y 'updatedAt'
    timestamps: true,
    // Limpia el objeto al enviarlo al frontend (quita el campo __v)
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Product", productSchema);
