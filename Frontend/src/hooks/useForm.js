import { useState } from 'react';

const useForm = (initialValues) => {
  // Guardamos todo el formulario en un solo objeto de estado
  const [values, setValues] = useState(initialValues);

  // Manejador Genérico: Funciona para cualquier input que tenga 'name'
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Reinicia el formulario al estado inicial
  const resetForm = () => {
    setValues(initialValues);
  };

  // Permite setear manualemente un campo (útil para selects o uploads)
  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,        // Objeto con todos los datos { username: '', password: '' }
    handleChange,  // Conectalo al onChange de los inputs
    resetForm,     // Limpia todo
    setValues,     // Para casos avanzados
    setFieldValue  // Para actualizar un solo campo manualmente
  };
};

export default useForm;