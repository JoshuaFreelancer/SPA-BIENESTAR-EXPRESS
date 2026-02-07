import SearchBar from "./SearchBar";
import ProductForm from "./ProductForm";
import ActionsDropdown from "./ActionsDropdown";
import FilterDropdown from "./FilterDropdown";
import TableRow from "./TableRow";
import PaginationInfo from "./PaginationInfo";
import PaginationNav from "./PaginationNav";

function InventoryTable({
  products = [],
  onDelete,
  onRefresh, // Para recargar datos al crear
  currentFilter, // <--- Recibido de App
  onFilterChange, // <--- Recibido de App
  pagination, // Objeto { page, totalPages, totalItems, onPageChange }
}) {
  return (
    <section className="p-3 sm:p-5 font-kodchasan">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {/* Cabecera y Herramientas */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <SearchBar />
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              {/* Formulario de Alta */}
              <ProductForm onProductAdded={onRefresh} />

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <ActionsDropdown />

                {/* CONEXIÓN DEL FILTRO */}
                <FilterDropdown
                  currentFilter={currentFilter}
                  onFilterChange={onFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white font-bold uppercase bg-[#239089] border-b dark:bg-gray-700 dark:text-gray-400">
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
                  <th scope="col" className="px-4 py-3 text-center">
                    Imagen
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Estado Vacío */}
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg
                          className="w-10 h-10 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>No se encontraron productos con el filtro actual.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((item) => (
                    <TableRow
                      key={item._id}
                      {...item} // Pasa todas las props del producto
                      onDelete={onDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer de Paginación */}
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            aria-label="Table navigation"
          >
            <PaginationInfo
              currentPage={pagination?.page || 1}
              itemsPerPage={10}
              totalItems={pagination?.totalItems || 0}
            />

            <PaginationNav
              currentPage={pagination?.page || 1}
              totalPages={pagination?.totalPages || 1}
              onPageChange={pagination?.onPageChange}
            />
          </nav>
        </div>
      </div>
    </section>
  );
}

export default InventoryTable;
