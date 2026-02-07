import { useState } from "react";
import useForm from "../../hooks/useForm";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RegisterForm = ({ showModal, setShowModal, switchToLogin }) => {
  const { values, handleChange, resetForm } = useForm({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (values.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    const toastId = toast.loading("Creando cuenta...");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Bienvenido! Inicia sesión.", { id: toastId });
        resetForm();
        setShowModal(false);
        if (switchToLogin) switchToLogin();
      } else {
        toast.error(data.message || "Error al registrarse", { id: toastId });
      }
    } catch (err) {
      toast.error("Error de conexión", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in-up">
         {/* TARJETA PROFESIONAL: Sombra profunda y bordes redondeados */}
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative font-kodchasan overflow-hidden border border-gray-100">
          {/* --- CABECERA DE ALTO CONTRASTE (Primary-800) --- */}
          {/* Esto le da el toque serio y corporativo */}
          <div className="bg-primary-800 p-6 flex flex-col items-center justify-center relative">
            {/* Botón Cerrar (Blanco sobre oscuro) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <svg
                className="w-5 h-5"
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

            {/* Logo e Info en Blanco */}
            <div className="bg-white/10 p-2 rounded-full mb-2 backdrop-blur-sm">
              <img
                src="/assets/images/Logo.png"
                alt="Logo"
                className="h-8 object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Crear Cuenta
            </h2>
            <p className="text-primary-100 text-xs mt-1">
              Gestión profesional de farmacia
            </p>
          </div>

          {/* --- CUERPO DEL FORMULARIO (Blanco Puro) --- */}
          <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wider">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all placeholder-gray-400"
                    placeholder="Nombre"
                    required
                  />
                </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all placeholder-gray-400"
                  placeholder="usuario@farmacia.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wider">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all placeholder-gray-400"
                  placeholder="••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm py-3 rounded-lg shadow-md mt-4 transition-all transform active:scale-[0.98] ${isLoading ? "opacity-70 cursor-wait" : ""}`}
              >
                {isLoading ? "Registrando..." : "REGISTRARSE"}
              </button>
            </form>

            <div className="mt-5 text-center pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-xs">
                ¿Ya tienes acceso?{" "}
                <button
                  onClick={() => {
                    setShowModal(false);
                    if (switchToLogin) switchToLogin();
                  }}
                  className="text-primary-700 font-bold hover:underline hover:text-primary-900"
                >
                  Inicia Sesión
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
