import React from 'react';
import useDropdown from '../../hooks/useDropdown';

function ActionsDropdown() {
  const { isOpen, toggleDropdown, closeDropdowns } = useDropdown(false);

  return (
    <>
      <button
        id="actionsDropdownButton"
        onClick={toggleDropdown}
        onBlur={closeDropdowns}
        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-kodchasan font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
      >
        <svg
          className="-ml-1 mr-1.5 w-5 h-5"
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
        Acciones
      </button>
      {isOpen && (
        <div
          id="actionsDropdown"
          className="absolute z-10 top-14 right-1/5 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="actionsDropdownButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 font-kodchasan hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edición Masiva
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block py-2 px-4 font-kodchasan text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Borrar Todo
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ActionsDropdown;
