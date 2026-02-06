import { useState } from "react";

const useInputState = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    // Maneja tanto eventos (e.target.value) como valores directos
    setValue(e && e.target ? e.target.value : e);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange: handleChange,
    reset,
    setValue,
    // Helper para conectar rápido: <input {...bind} />
    bind: {
      value,
      onChange: handleChange,
    },
  };
};

export default useInputState;
