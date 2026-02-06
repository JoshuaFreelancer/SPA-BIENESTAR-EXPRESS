import { useState, useEffect } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const Header = () => {
  // Estados para modales
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Estado para saber si hay usuario (Simulación de sesión)
  const [user, setUser] = useState(null);

  // Al cargar la página, verificamos si hay un usuario guardado en el navegador
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Asumiendo que guardaste el objeto usuario al loguearte
    const token = localStorage.getItem("auth-token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.reload(); // Recargamos para limpiar estados de la app
    }
  };

  const openLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const openRegister = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  return (
    // Usamos bg-primary-200/500 en lugar de hex codes para consistencia con tu Tailwind config
    <header className="bg-primary-100 border-b-4 border-primary-500 shadow-sm dark:bg-gray-900 dark:border-primary-900">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LOGO Y TÍTULO */}
        <div className="flex items-center space-x-4">
          <img
            src="/assets/images/Logo.png"
            alt="Bienestar Express Logo"
            className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white uppercase font-kodchasan tracking-tight">
            Bienestar <span className="text-primary-600">Express</span>
          </h1>
        </div>

        {/* ÁREA DE USUARIO */}
        <div className="flex items-center gap-3">
          {user ? (
            // VISTA: USUARIO LOGUEADO
            <div className="flex items-center gap-4 animate-fade-in">
              <span className="text-gray-700 dark:text-gray-200 font-kodchasan font-medium text-sm sm:text-base">
                Hola,{" "}
                <span className="text-primary-700 dark:text-primary-400 font-bold">
                  {user.name}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-200 transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            // VISTA: INVITADO (LOGIN/REGISTER)
            <div className="flex gap-2 animate-fade-in">
              <button
                onClick={openLogin}
                className="px-5 py-2 text-sm font-medium text-primary-700 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 hover:text-primary-800 transition-colors shadow-sm"
              >
                Iniciar sesión
              </button>
              <button
                onClick={openRegister}
                className="px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition-colors shadow-md"
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALES */}
      {/* Pasamos 'setUser' al LoginForm para que actualice el header al loguearse exitosamente */}
      <LoginForm
        showModal={showLoginForm}
        setShowModal={setShowLoginForm}
        switchToRegister={openRegister} // Simplificado: pasamos la función directa
        onLoginSuccess={(userData) => setUser(userData)} // Callback para actualizar estado inmediato
      />

      <RegisterForm
        showModal={showRegisterForm}
        setShowModal={setShowRegisterForm}
        switchToLogin={openLogin}
      />
    </header>
  );
};

export default Header;
