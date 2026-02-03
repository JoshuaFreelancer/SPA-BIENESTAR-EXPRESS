// useRegisterForm.js
import { useState } from 'react';

const useRegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return {
    fullName,
    setFullName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    resetForm,
  };
};

export default useRegisterForm;
