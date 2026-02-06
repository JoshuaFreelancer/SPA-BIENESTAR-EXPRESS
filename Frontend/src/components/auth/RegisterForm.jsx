import { useState } from "react";
import useForm from "../../hooks/useForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RegisterForm = ({ showModal, setShowModal, switchToLogin }) => {
  // 1. Hook unificado
  const { values, handleChange, resetForm } = useForm({
    fullName: "",
    username: "",
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validación básica antes de enviar
    if(values.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mapeamos los nombres del form a lo que espera tu backend (revisar nombres exactos)
        body: JSON.stringify({
            name: values.fullName, // Tu backend probablemente espera 'name'
            username: values.username,
            email: values.email,
            password: values.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Registro exitoso! Por favor inicia sesión.");
        resetForm();
        setShowModal(false);
        if (switchToLogin) switchToLogin(); // Abrir modal de login automáticamente
      } else {
        setError(data.message || "Error al registrarse");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowModal(false)}></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-[#1D1C25] p-8 rounded-2xl shadow-2xl text-white font-kodchasan w-full max-w-md relative border border-gray-700">
          
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div className="flex flex-col items-center mb-4">
            <img src="/assets/images/Logo.png" alt="Logo" className="h-14 mb-2 drop-shadow-md" />
            <h2 className="text-2xl font-bold text-primary-400">Crear Cuenta</h2>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-6 opacity-50">
            <div className="h-px w-full bg-gray-500"></div>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            <div className="h-px w-full bg-gray-500"></div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="Nombre Completo"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="Nombre de Usuario"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="Contraseña (min. 6 caracteres)"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-2.5 rounded-xl shadow-lg mt-2 transition-all transform hover:scale-[1.02] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
          
           <p className="text-center mt-5 text-gray-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={() => {
                setShowModal(false);
                if(switchToLogin) switchToLogin();
              }}
              className="text-primary-400 font-bold hover:text-primary-300 hover:underline focus:outline-none transition-colors"
            >
              Inicia Sesión
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;