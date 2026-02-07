import { useState } from "react";
import { createPortal } from "react-dom";
import useDropdown from "../../hooks/useDropdown";

function FilterDropdown({ currentFilter, onFilterChange }) {
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } =
    useDropdown(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // FILTROS MEJORADOS PARA FARMACIA
  const filters = [
    { label: "Recientes (Todos)", value: "all" },
    { label: "Stock Crítico (< 5)", value: "low_stock" }, // Más urgente
    { label: "Agotados", value: "out_of_stock" },
    { label: "Alto Valor (> $50)", value: "expensive" },
    { label: "Económicos (< $10)", value: "cheap" },
    { label: "Más Antiguos", value: "oldest" },
  ];

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.right + window.scrollX,
      });
    }
    toggleDropdown();
  };

  const handleSelection = (value) => {
    if (onFilterChange) onFilterChange(value);
    closeDropdowns();
  };

  const dropdownMenu = (
    <>
      <div
        className="fixed inset-0 z-[60] bg-transparent"
        onMouseDown={() => closeDropdowns()}
      ></div>
      <div
        className="fixed z-[70] w-64 bg-white rounded-xl shadow-xl border border-gray-100 animate-fade-in-up origin-top-right overflow-hidden font-kodchasan"
        style={{
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
          transform: "translateX(-100%)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Filtrar inventario
          </span>
        </div>
        <ul className="py-1">
          {filters.map((filter) => {
            const isSelected = currentFilter === filter.value;
            return (
              <li key={filter.value}>
                <button
                  type="button"
                  onClick={() => handleSelection(filter.value)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors
                    ${
                      isSelected
                        ? "bg-primary-50 text-primary-800 font-bold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    }`}
                >
                  <span>{filter.label}</span>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  return (
    <div ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium focus:outline-none rounded-lg border transition-all duration-200
          ${
            isOpen
              ? "bg-primary-50 text-primary-700 border-primary-500 ring-4 ring-primary-100"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary-700 hover:border-primary-300"
          }`}
        type="button"
      >
        <svg
          className="w-4 h-4 mr-2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filtros
        {currentFilter !== "all" && (
          <span className="ml-2 flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
          </span>
        )}
      </button>
      {isOpen && createPortal(dropdownMenu, document.body)}
    </div>
  );
}

export default FilterDropdown;
