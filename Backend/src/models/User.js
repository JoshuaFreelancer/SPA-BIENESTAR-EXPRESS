const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Elimina espacios en blanco al inicio y final
      minlength: 3, // Bajé el mínimo a 3 (ej. "Ana", "Leo")
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true, // INDISPENSABLE: No permite correos duplicados
      trim: true,
      lowercase: true, // Convierte todo a minúsculas antes de guardar
      minlength: 6,
      maxlength: 255,
      // Validación básica de formato de email (Regex)
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, ingresa un email válido",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Longitud mínima de seguridad recomendada
      maxlength: 1024, // Espacio suficiente para el hash encriptado
    },
  },
  {
    // Genera automáticamente 'createdAt' y 'updatedAt'
    timestamps: true,

    // Método para limpiar la respuesta JSON (Seguridad)
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password; // NUNCA enviamos la contraseña al frontend
        delete ret.__v; // Eliminamos la versión interna de Mongo
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("User", userSchema);
