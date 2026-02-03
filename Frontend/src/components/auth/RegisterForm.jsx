import React from "react";
import useRegisterForm from "../../hooks/useRegisterForm";

const RegisterForm = ({ showModal, setShowModal }) => {
  const {
    fullName,
    setFullName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    resetForm,
  } = useRegisterForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de registro
    console.log("Nombre completo:", fullName);
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    console.log("Email:", email);
    // Limpia el formulario después de enviar
    resetForm();
    // Cierra el modal después de enviar el formulario
    setShowModal(false);
  };

  return (
    <>
      {/* Fondo oscuro */}
      {showModal && (
        <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      )}

      {/* Modal de registro */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#1D1C25] p-8 rounded-lg shadow-md text-white font-kodchasan w-96">
            <button
              onClick={() => setShowModal(false)}
              className="text-white text-4xl font-semibold focus:outline-none"
            >
              X
            </button>
            <div className="flex items-center justify-center mb-4">
            <img
                src="/assets/images/Logo.png"
                alt="Logo"
                className="h-20 mb-2"
              />
            </div>
            <div className="flex justify-center mb-4">
              <h2 className="text-2xl font-semibold underline">
                Registrate
              </h2>
            </div>
            <p className="mb-4 text-center">
            Únete hoy a Bienestar Express y toma el control de tu inventario con nosotros. Regístrate ahora para empezar a cuidar tu negocio como un experto en salud.
            </p>
            <div className="flex justify-center mb-8">
              <hr className="border border-white my-0.5 w-1/3 mr-5" />
              {/* Línea larga */}
              <hr className="border border-white my-0.5 w-5" />
              {/* Línea corta */}
              <hr className="border border-white my-0.5 w-1/3 ml-5" />
              {/* Línea larga */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-lg px-4 py-2 bg-black bg-opacity-60 border-2 border-[#A19F9F] text-white placeholder-white::placeholder"
                  placeholder="Nombre Completo"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-lg px-4 py-2 bg-black bg-opacity-60 border-2 border-[#A19F9F] text-white placeholder-white::placeholder"
                  placeholder="Usuario"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg px-4 py-2 bg-black bg-opacity-60 border-2 border-[#A19F9F] text-white placeholder-white::placeholder"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg px-4 py-2 bg-black bg-opacity-60 border-2 border-[#A19F9F] text-white placeholder-white::placeholder"
                  placeholder="Contraseña"
                />
              </div>
              <button
                type="submit"
                className="bg-[#239089] text-xl hover:bg-primary-800 w-full font-bold px-4 py-2 rounded-lg focus:outline-none"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
