import React, { useState } from 'react';

const User = ({ isAuthenticated, userName }) => {
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar la visualización del menú

  // Función para manejar el clic en la imagen de usuario
  const handleUserClick = () => {
    setShowMenu(!showMenu); // Alternar la visualización del menú al hacer clic en la imagen de usuario
  };

  return (
    <>
      {isAuthenticated && (
        <div className="relative">
          {/* Imagen de usuario */}
          <img
            src="/assets/images/User.png"
            alt="User"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={handleUserClick}
          />
          {/* Menú de opciones */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
              <ul>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Ver perfil ({userName})</li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Cerrar sesión</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default User;
