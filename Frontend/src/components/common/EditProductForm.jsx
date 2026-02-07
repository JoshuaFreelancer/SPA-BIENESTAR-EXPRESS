import { useState } from "react";
import { createPortal } from "react-dom"; // IMPORTANTE: Saca el modal fuera del DOM de la tabla
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function EditProductForm({ productData, onOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Inicializamos el estado con los datos actuales
  const [formData, setFormData] = useState({
    name: productData.name || "",
    category: productData.category || "",
    stock: productData.stock || 0,
    price: productData.price || 0,
    // Manejo robusto para la imagen (sea objeto Cloudinary o string)
    img: productData.img?.url || productData.img || "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setShowModal(true);
    if (onOpen) onOpen(); // Cierra el menú desplegable al abrir el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Actualizando producto...");

    try {
      const response = await fetch(`${API_URL}/api/products/${productData._id}`, {
        method: 'PUT', // Verifica si tu backend usa PUT o PATCH
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Producto actualizado", { id: toastId });
        setShowModal(false);
        
        // RECOMENDACIÓN: Descomenta esto si quieres que la tabla se actualice sola al instante
        window.location.reload(); 
      } else {
        toast.error(data.message || "Error al actualizar", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // --- CONTENIDO DEL MODAL (Renderizado vía Portal) ---
  const modalContent = (
    <>
      {/* Fondo Oscuro con Blur */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9999] transition-opacity"
        onClick={() => setShowModal(false)}
      ></div>

      {/* Contenedor del Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-gray-100 font-kodchasan pointer-events-auto animate-fade-in-up">
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <h3 className="text-xl font-bold text-gray-800">
              Editar Producto
            </h3>
            <button 
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Nombre</label>
                <input 
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 outline-none" 
                  value={formData.name} 
                  type="text" 
                  name="name" 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Categoría</label>
                <input 
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 outline-none" 
                  value={formData.category} 
                  type="text" 
                  name="category" 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Stock</label>
                <input 
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 outline-none" 
                  value={formData.stock} 
                  type="number" 
                  name="stock" 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Precio ($)</label>
                <input 
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 outline-none" 
                  value={formData.price} 
                  type="number" 
                  name="price" 
                  onChange={handleChange} 
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
              <button 
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors" 
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-4 py-2 text-sm font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-md transition-all active:scale-95 disabled:opacity-70"
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Botón Trigger dentro del Dropdown */}
      <button 
        className="w-full text-left py-2 px-4 font-kodchasan text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors flex items-center"
        type="button"
        onClick={handleOpen}
      >
        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        Editar
      </button>

      {/* Renderizamos el modal en el BODY usando Portal */}
      {showModal && createPortal(modalContent, document.body)}
    </>
  );
}

export default EditProductForm;