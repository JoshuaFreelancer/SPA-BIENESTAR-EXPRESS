import { useState } from 'react';

let isAnyDropdownOpen = false;

function useDropdown(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleDropdown = () => {
    if (isOpen && isAnyDropdownOpen) {
      isAnyDropdownOpen = false;
    } else {
      isAnyDropdownOpen = true;
    }
    setIsOpen(!isOpen);
  };

  const closeDropdowns = () => {
    isAnyDropdownOpen = false;
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleDropdown,
    closeDropdowns,
  };
}

export default useDropdown;
