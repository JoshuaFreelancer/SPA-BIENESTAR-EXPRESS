import { useState } from 'react';

// URL base (ajustar si usas variables de entorno)
const API_URL = 'http://localhost:5000/api/products';

function ProductForm({ onProductAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null); // Para mostrar la foto antes de subirla
  
  // Estado inicial del formulario
  const initialFormState = {
    name: '',
    category: '',
    stock: '',
    price: '',
    brand: '', // Agregué marca ya que tu modelo nuevo lo soporta
    img: null  // Aquí guardaremos el archivo binario, no un string
  };

  const [product, setProduct] = useState(initialFormState);

  // Manejador de cambios (Texto y Archivos)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img' && files && files[0]) {
      // Lógica para previsualizar la imagen
      const file = files[0];
      setProduct({ ...product, img: file });
      setPreview(URL.createObjectURL(file)); // Crea URL temporal para verla
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Preparar FormData (Obligatorio para subir archivos)
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('stock', product.stock);
    formData.append('price', product.price);
    formData.append('brand', product.brand || 'Genérico');
    
    // Solo adjuntamos la imagen si el usuario seleccionó una
    if (product.img) {
      formData.append('img', product.img);
    }

    // 2. Obtener Token
    const token = localStorage.getItem('auth-token');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'auth-token': token
          // NOTA IMPORTANTE: Con FormData NO se pone 'Content-Type': 'application/json'
          // El navegador lo pone automático con el "boundary" correcto.
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // Éxito
        if (onProductAdded) onProductAdded(); // Recarga la tabla
        handleClose(); // Cierra el modal y resetea
        alert("Producto creado exitosamente");
      } else {
        alert(data.message || "Error al crear producto");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setProduct(initialFormState);
    setPreview(null);
  };

  return (
    <>
      {/* Botón Principal */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-kodchasan font-medium rounded-lg text-sm px-4 py-2 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
        Nuevo Producto
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-4">
            <div className="relative w-full max-w-2xl max-h-full">
              
              {/* Contenido del Modal */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 border dark:border-gray-700">
                
                {/* Header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-kodchasan">
                    Agregar Nuevo Producto
                  </h3>
                  <button onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                  </button>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 font-kodchasan">
                  <div className="grid grid-cols-6 gap-6">
                    
                    {/* Nombre */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Producto</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={product.name}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="Ej: Aspirina 500mg" 
                        required 
                      />
                    </div>

                    {/* Categoría */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
                      <input 
                        type="text" 
                        name="category" 
                        value={product.category}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="Ej: Analgésicos" 
                        required 
                      />
                    </div>

                    {/* Marca (Nuevo) */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca / Laboratorio</label>
                      <input 
                        type="text" 
                        name="brand" 
                        value={product.brand}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="Ej: Bayer" 
                      />
                    </div>

                    {/* Precio */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio ($)</label>
                      <input 
                        type="number" 
                        name="price" 
                        value={product.price}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="0.00" 
                        required 
                      />
                    </div>

                    {/* Stock */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock Inicial</label>
                      <input 
                        type="number" 
                        name="stock" 
                        value={product.stock}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="0" 
                        required 
                      />
                    </div>

                    {/* Input de Imagen (Tipo File) */}
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen del Producto</label>
                      <div className="flex items-center space-x-4">
                        {preview && (
                          <img src={preview} alt="Vista previa" className="w-16 h-16 object-cover rounded-full border" />
                        )}
                        <input 
                          type="file" 
                          name="img" 
                          accept="image/*"
                          onChange={handleChange}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Botones */}
                  <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button 
                      type="button" 
                      onClick={handleClose} 
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Subiendo...' : 'Guardar Producto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default ProductForm;