import { useState, useEffect, useRef } from "react";

function useDropdown(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  // Creamos una referencia para saber qué elemento del DOM es el menú
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdowns = () => setIsOpen(false);

  // Efecto para detectar clics fuera del elemento y tecla ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el menú está cerrado, no hacemos nada
      if (!isOpen) return;

      // Si el clic NO fue dentro del elemento referenciado, cerramos
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Agregamos los escuchadores de eventos al documento
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Limpieza: quitamos los escuchadores cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]); // Se ejecuta cada vez que cambia el estado isOpen

  return {
    isOpen,
    toggleDropdown,
    closeDropdowns,
    dropdownRef, // IMPORTANTE: Devolvemos la referencia para conectarla al div
  };
}

export default useDropdown;
