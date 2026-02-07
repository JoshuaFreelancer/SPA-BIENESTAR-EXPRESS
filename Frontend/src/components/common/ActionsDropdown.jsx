import React from "react";
import useDropdown from "../../hooks/useDropdown";
import toast from "react-hot-toast"; // 1. Importamos Toast

function ActionsDropdown({ onBulkDelete }) {
  // 1. Hook para manejar apertura/cierre
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } =
    useDropdown(false);

  // 2. Manejador para la acción de "Borrar Todo"
  const handleDeleteAllClick = () => {
    closeDropdowns(); // Cerramos el menú inmediatamente

    // TOAST DE ALERTA MÁXIMA
    toast(
      (t) => (
        <div className="flex flex-col gap-3 font-kodchasan max-w-sm">
          <div className="flex items-start gap-3">
            {/* Icono de Advertencia */}
            <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                ¿Vaciar Inventario?
              </h3>
              <p className="text-sm text-gray-500 mt-1 leading-snug">
                Estás a punto de borrar <b>TODOS</b> los productos. Esta acción
                es irreversible.
              </p>
            </div>
          </div>

          {/* Botonera del Toast */}
          <div className="flex gap-2 justify-end mt-1">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                if (onBulkDelete) onBulkDelete(); // Ejecutamos la función del padre
              }}
              className="px-3 py-1.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors"
            >
              Sí, borrar todo
            </button>
          </div>
        </div>
      ),
      {
        duration: 8000, // Duración larga para dar tiempo a leer
        position: "top-center",
        style: {
          border: "1px solid #fee2e2", // Borde rojo suave
          background: "#fff",
        },
      },
    );
  };

  const handleExport = () => {
    closeDropdowns();
    toast.success("Generando archivo CSV...", { icon: "📄" });
    // Aquí iría tu lógica real de exportación
  };

  return (
    // 3. FIX VISUAL: 'relative' para posicionar y 'inline-block' para no romper el layout
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón Principal */}
      <button
        id="actionsDropdownButton"
        onClick={toggleDropdown}
        className={`
            flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium 
            focus:outline-none rounded-lg border transition-all duration-200
            ${
              isOpen
                ? "bg-gray-100 text-gray-900 border-gray-300 ring-4 ring-gray-100"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary-700"
            }
        `}
        type="button"
      >
        Acciones
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50 animate-fade-in-up"
          role="menu"
        >
          <div className="py-1">
            <button
              onClick={() => {
                closeDropdowns();
                toast("Función en desarrollo 🛠️");
              }}
              className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-700 font-kodchasan transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500"
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
              Edición Masiva
            </button>
            <button
              onClick={handleExport}
              className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-700 font-kodchasan transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Exportar CSV
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={handleDeleteAllClick}
              className="group flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-kodchasan font-bold transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Borrar Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionsDropdown;
