import React, { useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import EditProductForm from "./EditProductForm";

// Definimos la URL base
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function TableRow({ _id, name, category, stock, price, img, onDelete }) {
  // 1. Obtenemos dropdownRef del hook
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } =
    useDropdown(false);

  const [isDeleting, setIsDeleting] = useState(false);

  // Helper para formatear dinero (UX)
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm(`¿Estás seguro de borrar "${name}"?`)) return;

    setIsDeleting(true);
    const token = localStorage.getItem("auth-token");

    try {
      const response = await fetch(`${API_URL}/api/products/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (onDelete) onDelete(_id);
        closeDropdowns();
      } else {
        alert(data.message || "Error al eliminar");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsDeleting(false);
    }
  };

  // Wrapper para el toggle que evita bubbling
  const handleToggle = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  return (
    <tr className="border-b dark:border-gray-700 relative hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-4 py-3">{category}</td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${stock < 10 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
        >
          {stock}
        </span>
      </td>

      <td className="px-4 py-3 font-mono">{formatPrice(price)}</td>

      <td className="px-4 py-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-100 mx-auto">
          <img
            src={img?.url || "https://via.placeholder.com/150?text=S/I"}
            alt={`Imagen de ${name}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Error";
            }}
          />
        </div>
      </td>

      <td className="px-4 py-3 flex items-center justify-end">
        {/* 2. AQUI ESTÁ LA CLAVE: El ref va en el contenedor relativo */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleToggle}
            className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-50 right-0 top-10 w-44 bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 border dark:border-gray-600 animate-fade-in">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li className="block hover:bg-gray-100 dark:hover:bg-gray-600">
                  <EditProductForm
                    productData={{ _id, name, category, stock, price, img }}
                  />
                </li>
              </ul>
              <div className="py-1">
                <button
                  className="block w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 disabled:opacity-50"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Eliminando..." : "Eliminar producto"}
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
