import React from 'react';
import useDropdown from '../../hooks/useDropdown';

function FilterDropdown() {
  const { isOpen, toggleDropdown, closeDropdowns } = useDropdown(false);

  return (
    <>
      <button
        id="filterDropdownButton"
        onClick={toggleDropdown}
        onBlur={closeDropdowns}
        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-4 w-4 mr-2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Filtro
        <svg
          className="-mr-1 ml-1.5 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="filterDropdown"
          className="absolute z-10 right-0 top-14 mt-2 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Elige Cantidad
          </h6>
          <ul
            className="space-y-2 text-sm"
            aria-labelledby="filterDropdownButton"
          >
            <li className="flex items-center">
              <input
                id="apple"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="apple"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Apple (56)
              </label>
            </li>
            {/* Agrega más elementos de la lista aquí si es necesario */}
          </ul>
        </div>
      )}
    </>
  );
}

export default FilterDropdown;
