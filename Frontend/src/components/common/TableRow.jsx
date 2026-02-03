import React, { useRef } from 'react';
import useDropdown from '../../hooks/useDropdown';
import EditProductForm from './EditProductForm';

function TableRow({ _id, name, category, stock, price, img }) {
  const { isOpen, toggleDropdown, closeDropdowns } = useDropdown(false);
  const dropdownRef = useRef(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    await fetch('http://localhost:5000/api/productos/deleteProd/'+_id, {
      method: 'DELETE',
      headers: myHeaders
    })
      .then(response => response.json())
      .then(data => {
        //deleteProduct(data);
        console.log(data);
        setShowModal(false);
        setProduct({});
        e.target.reset();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const menuClasses = isOpen ?
    "absolute z-10 top-1/2 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 mt-4" :
    "absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 hidden";

  return (
    <tr className="border-b dark:border-gray-700 relative">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-4 py-3">{category}</td>
      <td className="px-4 py-3">{stock}</td>
      <td className="px-4 py-3">{price}</td>
      <td className="px-4 py-2">{img}</td>
      <td className="px-4 py-3 flex items-center justify-end relative">
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        <div ref={dropdownRef} className={menuClasses}
        //onClick={handleClickOutside}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
               <EditProductForm _id={_id} name={name} category={category} stock={stock} price={price} img={img} />
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleDelete}
            >
              Borrar
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
