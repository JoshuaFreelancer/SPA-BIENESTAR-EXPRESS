import React from "react";
import useDropdown from "../../hooks/useDropdown";

function ActionsDropdown({ onBulkDelete }) {
  // 1. Destructuramos dropdownRef del hook
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } = useDropdown(false);

  // Wrapper para manejar acciones y cerrar el menú automáticamente
  const handleAction = (action) => {
    if (action === "deleteAll") {
      if (
        window.confirm(
          "¿ADVERTENCIA: Estás seguro de querer borrar TODO el inventario?",
        )
      ) {
        if (onBulkDelete) onBulkDelete();
      }
    }
    // Aquí iría la lógica de edición masiva
    closeDropdowns();
  };

  return (
    // 2. Conectamos la referencia al div padre
    <div className="relative" ref={dropdownRef}>
      {/* Botón Principal */}
      <button
        id="actionsDropdownButton"
        onClick={toggleDropdown}
        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
        type="button"
      >
        <svg
          className="-ml-1 mr-1.5 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
        Acciones
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-lg shadow-lg divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 border dark:border-gray-600 animate-fade-in-down">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                type="button"
                onClick={() => handleAction("massEdit")}
                className="w-full text-left py-2 px-4 font-kodchasan hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edición Masiva
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full text-left py-2 px-4 font-kodchasan hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Exportar CSV
              </button>
            </li>
          </ul>
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleAction("deleteAll")}
              className="w-full text-left py-2 px-4 font-kodchasan text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
            >
              Borrar Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionsDropdown;