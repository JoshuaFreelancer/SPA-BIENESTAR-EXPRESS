import React, { useState } from "react";
import useForm from "../../hooks/useForm"; // Usamos el hook nuevo

// URL base (ajustar según entorno)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LoginForm = ({
  showModal,
  setShowModal,
  setShowRegisterModal,
  onLoginSuccess,
}) => {
  // 1. Usamos el hook genérico useForm
  const { values, handleChange, resetForm } = useForm({
    email: "", // Cambié username por email, es más estándar (o usa username si tu backend lo exige)
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token y usuario
        localStorage.setItem("auth-token", data.data.token); // Ajusta según la respuesta de tu backend
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Avisar al Header para que cambie el botón
        if (onLoginSuccess) onLoginSuccess(data.data.user);

        resetForm();
        setShowModal(false);
        // Opcional: window.location.reload();
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-[#1D1C25] p-8 rounded-2xl shadow-2xl text-white font-kodchasan w-full max-w-md relative border border-gray-700">
          {/* Botón de Cerrar */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          {/* Logo y Título */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/assets/images/Logo.png"
              alt="Logo"
              className="h-16 mb-4 drop-shadow-lg"
            />
            <h2 className="text-3xl font-bold text-primary-400">Bienvenido</h2>
            <p className="text-gray-400 text-sm text-center mt-2">
              Tu acceso seguro al inventario de Bienestar Express
            </p>
          </div>

          {/* Separador Estilizado */}
          <div className="flex items-center justify-center space-x-2 mb-6 opacity-50">
            <div className="h-px w-full bg-gray-500"></div>
            <div className="h-1 w-1 rounded-full bg-gray-300"></div>
            <div className="h-px w-full bg-gray-500"></div>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email" // o text si usas username
                name="email" // Importante: debe coincidir con el key en useForm
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-primary-900/50 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary-900 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400 text-sm">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => {
                setShowModal(false);
                setShowRegisterModal(true);
              }}
              className="text-primary-400 font-bold hover:text-primary-300 hover:underline focus:outline-none transition-colors"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
