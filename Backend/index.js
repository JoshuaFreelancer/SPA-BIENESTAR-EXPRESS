const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1. Cargar variables de entorno INMEDIATAMENTE
// Esto garantiza que cualquier archivo importado después ya vea las variables
dotenv.config();

// Ahora sí importamos app, porque app ya podrá leer el .env
const app = require('./app');

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// 2. Validación de seguridad (Fail-fast)
if (!URI) {
  console.error('ERROR: La variable MONGO_URI no está definida en el archivo .env');
  process.exit(1);
}

// Opcional: Debug rápido para estar seguros de Cloudinary (bórralo después)
console.log('¿Cloudinary detectado?:', process.env.CLOUDINARY_URL ? 'SÍ' : 'NO');

// 3. Función de conexión profesional
const startServer = async () => {
  try {
    mongoose.set('strictQuery', false);

    console.log('Conectando a MongoDB Atlas...');
    await mongoose.connect(URI);
    
    console.log('✅ Conexión exitosa a la base de datos');

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

process.on('unhandledRejection', (err) => {
  console.log(`Error no manejado: ${err.message}`);
  process.exit(1);
});

startServer();