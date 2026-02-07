import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // 1. Importar Toast
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import User from "./User"; // 2. Importar el componente User Dropdown

const Header = () => {
  // Estados para modales
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Estado del usuario
  const [user, setUser] = useState(null);

  // Cargar usuario al inicio
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("auth-token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 3. LOGOUT CON TOAST ELEGANTE
  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-2 font-kodchasan">
        <span className="font-semibold text-gray-800">
          ¿Cerrar sesión?
        </span>
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performLogout();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
          >
            Salir
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      icon: '👋',
    });
  };

  const performLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Has cerrado sesión correctamente");
    // Opcional: window.location.reload(); si necesitas limpiar estados globales complejos
  };

  // Helpers para abrir modales
  const openLogin = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const openRegister = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30 font-kodchasan">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LOGO E IDENTIDAD */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.location.reload()}>
          <img
            src="/assets/images/Logo.png"
            alt="Bienestar Express Logo"
            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
             <h1 className="text-xl font-bold text-gray-800 leading-tight tracking-tight">
              BIENESTAR <span className="text-primary-600">EXPRESS</span>
            </h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
              Gestión Farmacéutica
            </span>
          </div>
        </div>

        {/* ÁREA DE ACCIONES DE USUARIO */}
        <div className="flex items-center gap-3">
          {user ? (
            // VISTA: USUARIO LOGUEADO (Componente User)
            <User 
                user={user} 
                onLogout={handleLogout} 
            />
          ) : (
            // VISTA: INVITADO
            <div className="flex gap-3 animate-fade-in">
              <button
                onClick={openLogin}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-primary-700 bg-transparent hover:bg-primary-50 rounded-lg transition-all"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={openRegister}
                className="px-5 py-2 text-sm font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 hover:shadow-lg"
              >
                Crear Cuenta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- MODALES CONECTADOS --- */}
      
      <LoginForm
        showModal={showLoginForm}
        setShowModal={setShowLoginForm}
        // AQUÍ ESTABA EL ERROR: Ahora pasamos setShowRegisterForm al prop correcto
        setShowRegisterModal={setShowRegisterForm} 
        onLoginSuccess={(userData) => setUser(userData)}
      />

      <RegisterForm
        showModal={showRegisterForm}
        setShowModal={setShowRegisterForm}
        // Pasamos la función para volver al login
        switchToLogin={openLogin}
      />
    </header>
  );
};

export default Header;