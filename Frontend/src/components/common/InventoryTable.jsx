import React from "react";
import SearchBar from "./SearchBar";
import ProductForm from './ProductForm';
import ActionsDropdown from "./ActionsDropdown";
import FilterDropdown from "./FilterDropdown";
import TableRow from "./TableRow";
import PaginationInfo from "./PaginationInfo";
import PaginationNav from "./PaginationNav";

function InventoryTable({ data }) {
  return (
    <section className="background-image p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl md:m-8 lg:m-8 xl:m-8 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            {/* Barra de busqueda*/}
            <SearchBar />
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              {/* Boton para agregar producto*/}
              <ProductForm />

              <div className="flex items-center space-x-3 w-full md:w-auto">
                {/* Boton de acciones editar u borrar productos*/}
                <ActionsDropdown />
                {/* Boton para filtrar los resultados*/}
                <FilterDropdown />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-kodchasan">
              <thead className="text-xs text-[#1E1E1E] font-bold uppercase bg-[#239089] border-1 border-[#F4F4F4] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Producto
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Categoría
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Cantidad
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Precio
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Imagen
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    _id={item._id}
                    name={item.name}
                    category={item.category}
                    stock={item.stock}
                    price={item.price}
                    img={item.img == 'false' 
                      ? 'N/a'
                      : <img src={item.img} className="max-w-auto max-h-8" /> }
                  />
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-2"
            aria-label="Table navigation"
          >
            <PaginationInfo
              currentPage={1}
              itemsPerPage={10}
              totalItems={data.length -1}
            />
            <PaginationNav
              currentPage={1}
              itemsPerPage={10}
              totalItems={data.length -1}
            />
          </nav>
        </div>
      </div>
    </section>
  );
}

export default InventoryTable;
