import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import useDropdown from '../../hooks/useDropdown';

function FilterDropdown({ currentFilter, onFilterChange }) {
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } = useDropdown(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const filters = [
    { label: "Ver Todos", value: "all" },
    { label: "Bajo Stock (< 10)", value: "low_stock" },
    { label: "Agotados (0)", value: "out_of_stock" },
    { label: "Más Caros (> $50)", value: "high_price" }
  ];

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Evita que otros eventos se disparen
    
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
    console.log("Filtro seleccionado:", value); // Debug
    if (onFilterChange) onFilterChange(value);
    closeDropdowns();
  };

  // Contenido del Portal
  const dropdownMenu = (
    <>
      {/* 1. BACKDROP: Detecta clic fuera y cierra el menú */}
      <div 
        className="fixed inset-0 z-[60] bg-transparent" 
        onMouseDown={() => closeDropdowns()} // Usamos onMouseDown para ser más rápidos que el click
      ></div>

      {/* 2. MENÚ FLOTANTE */}
      <div 
        className="fixed z-[70] w-64 bg-white rounded-xl shadow-xl border border-gray-100 animate-fade-in-up origin-top-right overflow-hidden font-kodchasan"
        style={{ 
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            transform: 'translateX(-100%)'
        }}
        // IMPORTANTE: Detenemos la propagación aquí para que el hook useDropdown 
        // no piense que dimos clic "fuera" del componente.
        onMouseDown={(e) => e.stopPropagation()} 
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="py-1">
          {filters.map((filter) => {
            const isSelected = currentFilter === filter.value;
            
            return (
              <li key={filter.value}>
                <button
                  type="button" // Importante especificar type button
                  onClick={() => handleSelection(filter.value)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors
                    ${isSelected 
                      ? "bg-primary-50 text-primary-800 font-bold" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    }`}
                >
                  <span>{filter.label}</span>
                  
                  {isSelected && (
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        
        {/* Footer Restablecer */}
        {currentFilter !== 'all' && (
          <div className="border-t border-gray-100 bg-gray-50 p-2">
             <button 
                type="button"
                onClick={() => handleSelection('all')}
                className="w-full py-1.5 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex items-center justify-center gap-1"
             >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Restablecer filtros
             </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium focus:outline-none rounded-lg border transition-all duration-200
          ${isOpen 
            ? "bg-primary-50 text-primary-700 border-primary-500 ring-4 ring-primary-100" 
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary-700 hover:border-primary-300"
          }`}
        type="button"
      >
        <svg className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
        </svg>
        Filtros
        
        {currentFilter !== 'all' && (
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