import React from "react";
import useDropdown from "../../hooks/useDropdown";

const User = ({ user, onLogout }) => {
  // 1. Destructuramos dropdownRef del hook actualizado
  const { isOpen, toggleDropdown, closeDropdowns, dropdownRef } = useDropdown(false);

  // Si no hay usuario, no renderizamos nada (Seguridad)
  if (!user) return null;

  // Lógica para obtener iniciales si no hay foto
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "U";
  };

  return (
    // 2. Conectamos la referencia al div contenedor principal
    <div className="relative z-50" ref={dropdownRef}>
      {/* --- AVATAR CLICKEABLE --- */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="relative w-10 h-10 overflow-hidden bg-primary-100 rounded-full border-2 border-primary-500 hover:border-primary-600 transition-colors">
          {/* Si tuviéramos URL de imagen, la mostramos. Si no, las iniciales */}
          {user.imgUrl ? ( 
            <img
              className="w-full h-full object-cover"
              src={user.imgUrl} // Usamos la propiedad real si existe
              alt="Avatar"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-kodchasan font-bold text-primary-700">
              {getInitials(user.name)}
            </span>
          )}
        </div>

        {/* Nombre visible (Oculto en móviles para ahorrar espacio) */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-kodchasan">
            {user.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.role || "Usuario"}
          </div>
        </div>

        {/* Flechita pequeña */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      {/* --- MENÚ DESPLEGABLE --- */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 dark:bg-gray-700 border dark:border-gray-600 animate-fade-in-down">
          {/* Header del menú (Solo visible en móvil) */}
          <div className="px-4 py-3 border-b dark:border-gray-600 md:hidden">
            <span className="block text-sm text-gray-900 dark:text-white font-bold">
              {user.name}
            </span>
            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
              {user.email}
            </span>
          </div>

          <ul className="py-1">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-kodchasan"
              >
                Mi Perfil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-kodchasan"
              >
                Configuración
              </a>
            </li>
          </ul>

          <div className="py-1 border-t dark:border-gray-600">
            <button
              onClick={() => {
                closeDropdowns();
                if (onLogout) onLogout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 dark:hover:text-white font-kodchasan font-bold"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;