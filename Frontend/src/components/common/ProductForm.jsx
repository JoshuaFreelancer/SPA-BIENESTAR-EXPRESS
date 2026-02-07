import { useState } from 'react';
import toast from 'react-hot-toast'; // 1. Importamos Toast

// URL dinámica basada en el entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ProductForm({ onProductAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const initialFormState = {
    name: '',
    category: '',
    stock: '',
    price: '',
    brand: '',
    img: null
  };

  const [product, setProduct] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img' && files && files[0]) {
      const file = files[0];
      
      // Validación simple de tamaño (opcional, ej: máx 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("La imagen es muy pesada. Máximo 2MB.");
        return;
      }

      setProduct({ ...product, img: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 2. Iniciamos el Toast de carga
    const toastId = toast.loading("Guardando producto...");

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('stock', product.stock);
    formData.append('price', product.price);
    formData.append('brand', product.brand || 'Genérico');
    
    if (product.img) {
      formData.append('img', product.img);
    }

    const token = localStorage.getItem('auth-token');

    try {
      // Ajustamos la URL para apuntar al endpoint correcto
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'auth-token': token
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Éxito: Actualizamos el toast
        toast.success("¡Producto agregado al inventario!", { id: toastId });
        
        if (onProductAdded) onProductAdded();
        handleClose();
      } else {
        // Error del Backend
        toast.error(data.message || "No se pudo crear el producto", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      // Error de Red
      toast.error("Error de conexión con el servidor", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Limpieza de memoria de la imagen previa
    if (preview) URL.revokeObjectURL(preview);
    
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
        className="flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-kodchasan font-bold rounded-lg text-sm px-4 py-2 focus:outline-none transition-transform hover:scale-105 shadow-md"
      >
        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Nuevo Producto
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleClose} // Cierra al hacer clic fuera
          ></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-4 animate-fade-in-up">
            <div className="relative w-full max-w-2xl max-h-full">
              
              {/* Contenido del Modal */}
              <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 font-kodchasan">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                  <h3 className="text-xl font-bold text-gray-800">
                    Agregar Nuevo Producto
                  </h3>
                  <button 
                    onClick={handleClose} 
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center transition-colors"
                  >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                  </button>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    
                    {/* Nombre */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Nombre del Producto</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={product.name}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none transition-shadow focus:shadow-md" 
                        placeholder="Ej: Aspirina 500mg" 
                        required 
                      />
                    </div>

                    {/* Categoría */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Categoría</label>
                      <input 
                        type="text" 
                        name="category" 
                        value={product.category}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none transition-shadow focus:shadow-md" 
                        placeholder="Ej: Analgésicos" 
                        required 
                      />
                    </div>

                    {/* Marca */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Marca / Laboratorio</label>
                      <input 
                        type="text" 
                        name="brand" 
                        value={product.brand}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none transition-shadow focus:shadow-md" 
                        placeholder="Ej: Bayer" 
                      />
                    </div>

                    {/* Precio */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Precio ($)</label>
                      <input 
                        type="number" 
                        name="price" 
                        value={product.price}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none transition-shadow focus:shadow-md" 
                        placeholder="0.00" 
                        required 
                      />
                    </div>

                    {/* Stock */}
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Stock Inicial</label>
                      <input 
                        type="number" 
                        name="stock" 
                        value={product.stock}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none transition-shadow focus:shadow-md" 
                        placeholder="0" 
                        required 
                      />
                    </div>

                    {/* Input de Imagen */}
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Imagen del Producto</label>
                      <div className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        {preview ? (
                          <div className="relative group">
                             <img src={preview} alt="Vista previa" className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm" />
                             <button 
                               type="button" 
                               onClick={() => {setPreview(null); setProduct({...product, img: null})}}
                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                             </button>
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          </div>
                        )}
                        <input 
                          type="file" 
                          name="img" 
                          accept="image/*"
                          onChange={handleChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Botones */}
                  <div className="flex items-center justify-end pt-6 space-x-3 border-t border-gray-100">
                    <button 
                      type="button" 
                      onClick={handleClose} 
                      className="text-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center shadow-lg shadow-primary-200 transition-transform active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Subiendo...' : 'Guardar Producto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductForm;