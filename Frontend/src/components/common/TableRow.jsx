import React, { useState } from "react";
import { createPortal } from "react-dom";
import useDropdown from "../../hooks/useDropdown";
import EditProductForm from "./EditProductForm";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function TableRow({
  _id,
  name,
  category,
  brand,
  stock,
  price,
  img,
  onDelete,
  isAuthenticated, // <--- Recibimos estado de seguridad
}) {
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } =
    useDropdown(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showEditModal, setShowEditModal] = useState(false);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // --- DELETE LOGIC ---
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    closeDropdowns();
    toast(
      (t) => (
        <div className="flex flex-col gap-2 font-kodchasan">
          <div className="flex items-start gap-2">
            <span className="text-xl">🗑️</span>
            <div>
              <span className="font-bold text-gray-800 block">
                ¿Eliminar producto?
              </span>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                executeDelete();
              }}
              className="px-3 py-1 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-md"
            >
              Sí, borrar
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Eliminando...");
    const token = localStorage.getItem("auth-token");
    try {
      const response = await fetch(`${API_URL}/api/products/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "auth-token": token },
      });
      const data = await response.json();
      if (response.ok) {
        if (onDelete) onDelete(_id);
        toast.success("Eliminado", { id: toastId });
      } else {
        toast.error(data.message || "Error", { id: toastId });
      }
    } catch (error) {
      toast.error("Error de conexión", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX,
      });
    }
    toggleDropdown();
  };

  const openEditModal = (e) => {
    e.stopPropagation();
    closeDropdowns();
    setShowEditModal(true);
  };

  // --- MENÚ FLOTANTE (Solo se muestra si está autenticado) ---
  const dropdownMenu = (
    <>
      <div
        className="fixed inset-0 z-[60] bg-transparent"
        onMouseDown={() => closeDropdowns()}
      ></div>
      <div
        className="fixed z-[70] w-40 bg-white rounded-lg shadow-xl border border-gray-100 animate-fade-in overflow-hidden"
        style={{
          top: `${menuPosition.top + 5}px`,
          left: `${menuPosition.left}px`,
          transform: "translateX(-100%)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="py-1 text-sm text-gray-700 font-kodchasan">
          <li className="block hover:bg-gray-50 transition-colors">
            <button
              onClick={openEditModal}
              className="w-full text-left py-2 px-4 flex items-center gap-2 text-gray-700 hover:text-primary-600"
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Editar
            </button>
          </li>
          <li className="border-t border-gray-100">
            <button
              className="w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors flex items-center gap-2"
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              {isDeleting ? "..." : "Eliminar"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <>
      <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors group">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-4 py-3 text-gray-600">{category}</td>
        <td className="px-4 py-3 text-gray-600 font-medium">
          {brand || "Genérico"}
        </td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold border ${stock < 10 ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200"}`}
          >
            {stock} unids.
          </span>
        </td>
        <td className="px-4 py-3 font-mono font-semibold text-gray-700">
          {formatPrice(price)}
        </td>
        <td className="px-4 py-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-100 mx-auto">
            <img
              src={img?.url || "https://via.placeholder.com/150?text=S/I"}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=Error";
              }}
            />
          </div>
        </td>

        {/* --- COLUMNA ACCIONES SEGURA --- */}
        <td className="px-2 py-3 flex items-center justify-center">
          {isAuthenticated ? (
            // MODO ADMIN: Botón de 3 puntos
            <div ref={dropdownRef}>
              <button
                onClick={handleToggle}
                className={`inline-flex items-center p-1.5 text-sm font-medium text-center rounded-lg focus:outline-none transition-colors ${isOpen ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:text-gray-800 hover:bg-gray-200"}`}
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              {isOpen && createPortal(dropdownMenu, document.body)}
            </div>
          ) : (
            // MODO LECTURA: Candado
            <div className="group relative cursor-not-allowed">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
          )}
        </td>
      </tr>

      {/* Renderizamos el Modal solo si está autenticado (Doble seguridad) */}
      {isAuthenticated && (
        <EditProductForm
          productData={{ _id, name, category, brand, stock, price, img }}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

export default TableRow;
