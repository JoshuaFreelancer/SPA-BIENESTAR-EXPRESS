import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// AHORA RECIBE 'isOpen' y 'onClose' DESDE EL PADRE
function EditProductForm({ productData, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  // Estado local para los campos
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    stock: 0,
    price: 0,
  });

  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen && productData) {
      setFormData({
        name: productData.name || "",
        category: productData.category || "",
        brand: productData.brand || "",
        stock: productData.stock || 0,
        price: productData.price || 0,
      });

      if (productData.img && productData.img.url) {
        setPreview(productData.img.url);
      } else if (typeof productData.img === "string") {
        setPreview(productData.img);
      }
    }
  }, [isOpen, productData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files && files[0]) {
      const file = files[0];
      setImgFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Actualizando producto...");

    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("category", formData.category);
      dataToSend.append("brand", formData.brand);
      dataToSend.append("stock", formData.stock);
      dataToSend.append("price", formData.price);
      if (imgFile) dataToSend.append("img", imgFile);

      const response = await fetch(
        `${API_URL}/api/products/${productData._id}`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: dataToSend,
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Actualizado correctamente", { id: toastId });
        onClose(); // Cerrar modal
        window.location.reload();
      } else {
        toast.error(data.message || "Error al actualizar", { id: toastId });
      }
    } catch (error) {
      toast.error("Error de conexión", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Renderizado vía Portal
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9999] transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
        <div
          className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-gray-100 font-kodchasan pointer-events-auto animate-fade-in-up max-h-[90vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-primary-800 rounded-t-xl sticky top-0 z-10">
            <h3 className="text-xl font-bold text-white">Editar Producto</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 transition-colors"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Nombre
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                  value={formData.name}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Categoría
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                  value={formData.category}
                  type="text"
                  name="category"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Marca / Lab
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                  value={formData.brand}
                  type="text"
                  name="brand"
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Stock
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                  value={formData.stock}
                  type="number"
                  name="stock"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Precio ($)
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
                  value={formData.price}
                  type="number"
                  name="price"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-6">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Imagen
                </label>
                <div className="flex items-center space-x-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      IMG
                    </div>
                  )}
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-70"
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default EditProductForm;
