import useInputState from './useInputState';

const useLoginForm = () => {
  const [username, setUsername, resetUsername] = useInputState('');
  const [password, setPassword, resetPassword] = useInputState('');

  const resetForm = () => {
    resetUsername();
    resetPassword();
  };

  return { username, password, setUsername, setPassword, resetForm };
};

export default useLoginForm;
