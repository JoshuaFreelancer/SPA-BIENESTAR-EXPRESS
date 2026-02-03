import React, { useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  return (
    <header className="bg-[#8AE0DB] text-[#F4F4F4] p-4 border-b-8 border-[#5DC1B9]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#313131] drop-shadow-md uppercase font-kodchasan">
            Bienestar Express
          </h1>
          <div className="ml-4 phone:ml-2">
            <img
              src="/assets/images/Logo.png"
              alt="Logo"
              className="h-10 sm:h-10 md:h-12 lg:h-14 xl:h-16"
            />
          </div>
        </div>
  
        <div>
          <button
            onClick={handleLoginClick}
            className="text-lg font-semibold text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            Iniciar sesión
          </button>
          <button
            onClick={handleRegisterClick}
            className="text-lg font-semibold text-white px-4 py-2 rounded-lg ml-4 focus:outline-none"
          >
            Registrarse
          </button>
        </div>
      </div>
      <LoginForm
        showModal={showLoginForm}
        setShowModal={setShowLoginForm}
        setShowRegisterModal={setShowRegisterForm}
      />
      {/* Mostrar formulario de inicio de sesión si showLoginForm es verdadero */}
      <RegisterForm
        showModal={showRegisterForm}
        setShowModal={setShowRegisterForm}
      />
      {/* Mostrar formulario de registro si showRegisterForm es verdadero */}
    </header>
  );
};  

export default Header;
