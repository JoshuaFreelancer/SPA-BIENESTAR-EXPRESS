import React from "react";
import useDropdown from "../../hooks/useDropdown";

function FilterDropdown({ currentFilter, onFilterChange }) {
  // 1. Destructuramos dropdownRef
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } =
    useDropdown(false);

  // Lista de filtros predefinidos
  const filters = [
    { label: "Ver Todos", value: "all" },
    { label: "Bajo Stock (< 10)", value: "low_stock" },
    { label: "Agotados (0)", value: "out_of_stock" },
    { label: "Más Caros", value: "high_price" },
  ];

  const handleSelection = (value) => {
    if (onFilterChange) onFilterChange(value);
    // MEJORA UX: Al ser selección única (radio), cerramos el menú al elegir
    closeDropdowns();
  };

  return (
    // 2. Conectamos la referencia al div contenedor
    <div className="relative" ref={dropdownRef}>
      {/* Botón del Filtro */}
      <button
        id="filterDropdownButton"
        onClick={toggleDropdown}
        className={`flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 transition-colors
          ${
            isOpen
              ? "bg-primary-50 text-primary-700 border-primary-500 ring-primary-200"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          }`}
        type="button"
      >
        <svg
          className="w-4 h-4 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
        Filtros
        {currentFilter !== "all" && currentFilter && (
          <span className="ml-2 w-2 h-2 bg-primary-600 rounded-full"></span>
        )}
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div
          id="filterDropdown"
          className="absolute z-50 right-0 mt-2 w-56 p-3 bg-white rounded-lg shadow-xl dark:bg-gray-700 border border-gray-100 dark:border-gray-600 animate-fade-in"
        >
          <h6 className="mb-3 text-sm font-bold text-gray-900 dark:text-white font-kodchasan">
            Estado del Inventario
          </h6>
          <ul
            className="space-y-2 text-sm"
            aria-labelledby="filterDropdownButton"
          >
            {filters.map((filter) => (
              <li
                key={filter.value}
                className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-600 rounded p-1 transition-colors"
              >
                <input
                  id={`filter-${filter.value}`}
                  type="radio"
                  name="inventory_filter"
                  value={filter.value}
                  checked={currentFilter === filter.value}
                  onChange={() => handleSelection(filter.value)}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                />
                <label
                  htmlFor={`filter-${filter.value}`}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer w-full font-kodchasan"
                >
                  {filter.label}
                </label>
              </li>
            ))}
          </ul>

          {/* Botón para limpiar filtros */}
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={() => {
                handleSelection("all");
                // closeDropdowns(); // Ya se cierra en handleSelection
              }}
              className="text-xs font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 hover:underline w-full text-center"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
