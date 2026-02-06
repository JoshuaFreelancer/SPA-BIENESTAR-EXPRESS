const Product = require('../models/Product');
const Joi = require('@hapi/joi');

// Esquema de validación con Joi
const productSchemaValidation = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    category: Joi.string().min(3).max(255).required(),
    brand: Joi.string().min(2).max(100).optional().allow(''), // Permitir string vacío
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(0).required()
});

/**
 * Obtener productos con Paginación Y Filtros
 */
const getAllProducts = async (req, res) => {
    try {
        // 1. Recoger parámetros del Query String
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filter = req.query.filter || 'all'; // Recibimos el filtro ('low_stock', etc.)
        const search = req.query.search || ''; // Preparado por si usas la barra de búsqueda

        const skip = (page - 1) * limit;

        // 2. Construir el objeto de consulta dinámica para MongoDB
        let query = {};

        // A. Aplicar Filtros de Estado
        switch (filter) {
            case 'low_stock':
                query.stock = { $lt: 10, $gt: 0 }; // Menor a 10 pero mayor a 0
                break;
            case 'out_of_stock':
                query.stock = 0; // Exactamente 0
                break;
            case 'high_price':
                query.price = { $gt: 50 }; // Mayor a 50 (puedes ajustar este valor)
                break;
            // 'all' no agrega nada al query, trae todo
        }

        // B. Aplicar Búsqueda por Texto (Opcional, pero recomendado para el SearchBar)
        if (search) {
            // Busca en nombre O categoría (insensible a mayúsculas)
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        // 3. Ejecutar consultas
        // IMPORTANTE: Usar 'query' en countDocuments para que la paginación sea correcta con filtros
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
            data: products
        });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

/**
 * Crear un nuevo producto
 */
const createProduct = async (req, res) => {
    // Validar datos (Joi)
    // Nota: Joi espera números puros, a veces FormData envía strings. 
    // Express suele parsear el body, pero si falla la validación, revisa que envíes números.
    const { error } = productSchemaValidation.validate(req.body);
    
    if (error) {
        return res.status(400).json({ ok: false, message: error.details[0].message });
    }

    try {
        const { name, category, brand, stock, price } = req.body;

        const imgData = req.file ? {
            url: req.file.path,
            public_id: req.file.filename
        } : undefined;

        const newProduct = new Product({
            name,
            category,
            brand: brand || 'Genérico', // Valor por defecto si no viene
            stock,
            price,
            img: imgData
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ ok: true, data: savedProduct });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

/**
 * Actualizar producto
 */
const updateProduct = async (req, res) => {
    // Para actualizaciones, permitimos que no envíen todos los campos
    // Usamos { abortEarly: false } y validamos solo lo que llega, 
    // pero Joi.validate valida todo el objeto. 
    // Para update parcial idealmente deberías usar otro esquema, pero dejémoslo funcional:
    
    // const { error } = productSchemaValidation.validate(req.body); 
    // if (error) return res.status(400).json(...) 
    // COMENTADO: A veces update envía solo stock, Joi fallaría si falta 'name'.
    // Si quieres validación estricta en update, descomenta.

    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.img = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedProduct) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });

        res.status(200).json({ ok: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

/**
 * Eliminar producto
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });

        // TODO: Importar cloudinary y usar cloudinary.uploader.destroy(product.img.public_id)
        
        res.status(200).json({ ok: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};