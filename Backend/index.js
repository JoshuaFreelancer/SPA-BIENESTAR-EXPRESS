const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// 1. Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// 2. Validación de seguridad (Fail-fast)
if (!URI) {
  console.error('ERROR: La variable MONGO_URI no está definida en el archivo .env');
  process.exit(1);
}

// 3. Función de conexión profesional
const startServer = async () => {
  try {
    // Configuraciones de Mongoose para evitar warnings en versiones modernas
    mongoose.set('strictQuery', false);

    console.log('Conectando a MongoDB Atlas...');
    await mongoose.connect(URI);
    
    console.log('✅ Conexión exitosa a la base de datos');

    // 4. Arrancar Express solo si la DB conectó
    app.listen(PORT, () => {
      console.log('---');
      console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
      console.log(`📂 Proyecto: Bienestar Express - Inventario`);
      console.log('---');
    });

  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:');
    console.error(error.message);
    process.exit(1);
  }
};

// Capturar errores no manejados fuera de la función principal
process.on('unhandledRejection', (err) => {
  console.log(`Error no manejado: ${err.message}`);
  process.exit(1);
});

startServer();