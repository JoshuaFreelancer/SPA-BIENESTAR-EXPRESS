import React, { useState } from 'react';

function ProductForm({ addProduct }) {

  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newProduct = { ...product };
    newProduct[name] = value;
    setProduct(newProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    await fetch('http://localhost:5000/api/productos/addProd', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        //addProduct(data);
        console.log(data);
        setShowModal(false);
        setProduct({});
        e.target.reset();
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Método para cerrar el modal
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}

      <button
        type="button"
        className="flex items-center justify-center text-white bg-[#239089] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-kodchasan font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        onClick={() => setShowModal(true)}
      >
        <svg
          className="h-3.5 w-3.5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Agregar Producto
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <form className="container mx-auto bg-[#5DC1B9] rounded-2xl p-5 product-form" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <label className='p-2 mx-3'>Nombre:</label>
                    <input className='bg-[#B5FFFF] border border-[#239089] text-gray-900 text-sm rounded-lg w-80 py-1 px-4' type="text" name="name" onChange={handleChange} />
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label className='p-2 mx-3'>Categoría:</label>
                    <input className='bg-[#B5FFFF] border border-[#239089] text-gray-900 text-sm rounded-lg w-80 py-1 px-4' type="text" name="category" onChange={handleChange} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <label className='p-2 mx-3'>Cantidad:</label>
                    <input className='bg-[#B5FFFF] border border-[#239089] text-gray-900 text-sm rounded-lg w-40 py-1 px-4' type="number" name="stock" onChange={handleChange} />
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label className='p-2 mx-3'>Precio:</label>
                    <input className='bg-[#B5FFFF] border border-[#239089] text-gray-900 text-sm rounded-lg w-40 py-1 px-4' type="number" name="price" onChange={handleChange} />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label className='p-2 mx-3'>Url link:</label>
                  <input className='bg-[#B5FFFF] border border-[#239089] text-gray-900 text-sm rounded-lg w-40 py-1 px-4' type="text" name="img" onChange={handleChange} />
                </div>
                <button className='text-gray-900 bg-[#8AE0DB] border border-[#239089] rounded-md sm:w-auto py-1 px-3 w-full text-center' type="submit">Agregar</button>
                <button className='text-gray-900 bg-[#8AE0DB] border border-[#239089] rounded-md sm:w-auto py-1 px-3 ml-4 w-full text-center' onClick={handleClose}>Cerrar</button>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Botón para cerrar el modal */}
    </>
  );
}

export default ProductForm;