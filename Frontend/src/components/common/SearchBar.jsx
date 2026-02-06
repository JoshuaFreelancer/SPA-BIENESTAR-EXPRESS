import React, { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de Debounce (Espera 500ms antes de buscar)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full md:w-1/2">
      <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="simple-search" className="sr-only">
          Buscar producto
        </label>
        <div className="relative w-full">
          {/* Ícono de Lupa (Color ajustado a tu paleta oscura si lo prefieres) */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Input con TUS colores restaurados */}
          <input
            type="text"
            id="simple-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // AQUÍ ESTÁ EL CAMBIO DE ESTILO:
            // 1. bg-gray-50 (Fondo gris muy claro como el original)
            // 2. border-2 border-primary-600 (Tu borde verde azulado grueso #0d9488)
            // 3. focus:ring-primary-500 (Anillo de enfoque coordinado)
            className="font-kodchasan bg-gray-50 border-2 border-primary-600 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-colors"
            placeholder="Buscar..."
            autoComplete="off"
          />

          {/* Botón "X" para limpiar */}
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-700 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
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
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
