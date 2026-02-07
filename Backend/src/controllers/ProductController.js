const Product = require("../models/Product");
const Joi = require("@hapi/joi");
const cloudinary = require("cloudinary").v2; // Importante: Importamos la SDK de Cloudinary

// Asegúrate de que tu configuración de Cloudinary (cloud_name, api_key, etc.)
// esté cargada en tu index.js o app.js principal mediante dotenv.

// Esquema de validación con Joi
const productSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  category: Joi.string().min(3).max(255).required(),
  brand: Joi.string().min(2).max(100).optional().allow(""),
  stock: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
});

/**
 * Obtener productos con Paginación, Filtros y Búsqueda
 */
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = req.query.filter || "all";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;
    let query = {};

    // 1. Aplicar Filtros
    switch (filter) {
      case "low_stock":
        query.stock = { $lt: 10, $gt: 0 };
        break;
      case "out_of_stock":
        query.stock = 0;
        break;
      case "high_price":
        query.price = { $gt: 50 };
        break;
    }

    // 2. Aplicar Búsqueda (Search)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }, // Agregué búsqueda por marca también
      ];
    }

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      ok: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

/**
 * Crear un nuevo producto
 */
const createProduct = async (req, res) => {
  // Validamos el body
  const { error } = productSchemaValidation.validate(req.body);
  if (error) {
    // Si hay error y se subió una imagen, deberíamos borrarla para no dejar basura,
    // pero como multer la sube antes de llegar aquí, es complejo.
    // Para simplificar, retornamos el error.
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });
  }

  try {
    const { name, category, brand, stock, price } = req.body;

    const imgData = req.file
      ? {
          url: req.file.path,
          public_id: req.file.filename,
        }
      : undefined;

    const newProduct = new Product({
      name,
      category,
      brand: brand || "Genérico",
      stock,
      price,
      img: imgData,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ ok: true, data: savedProduct });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Actualizar producto (Con limpieza de imagen anterior)
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Si el usuario está subiendo una imagen nueva...
    if (req.file) {
      // 1. Buscamos el producto viejo para obtener la ID de la imagen anterior
      const oldProduct = await Product.findById(id);

      // 2. Si tenía una imagen vieja, la borramos de Cloudinary
      if (oldProduct && oldProduct.img && oldProduct.img.public_id) {
        await cloudinary.uploader.destroy(oldProduct.img.public_id);
      }

      // 3. Asignamos la nueva imagen
      updateData.img = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct)
      return res
        .status(404)
        .json({ ok: false, message: "Producto no encontrado" });

    res.status(200).json({ ok: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

/**
 * Eliminar producto (Y su imagen en Cloudinary)
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Buscamos el producto antes de borrarlo
    const productToDelete = await Product.findById(id);

    if (!productToDelete) {
      return res
        .status(404)
        .json({ ok: false, message: "Producto no encontrado" });
    }

    // 2. Si tiene imagen en Cloudinary, la destruimos
    if (productToDelete.img && productToDelete.img.public_id) {
      await cloudinary.uploader.destroy(productToDelete.img.public_id);
    }

    // 3. Ahora sí, borramos el registro de MongoDB
    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ ok: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error); // Para ver el error en consola del servidor
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
