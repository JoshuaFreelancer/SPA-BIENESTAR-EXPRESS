import SearchBar from "./SearchBar";
import ProductForm from "./ProductForm";
import ActionsDropdown from "./ActionsDropdown";
import FilterDropdown from "./FilterDropdown";
import TableRow from "./TableRow";
import PaginationInfo from "./PaginationInfo";
import PaginationNav from "./PaginationNav";

// --- COMPONENTE LOADER MINIMALISTA ---
const MinimalLoader = () => (
  <tr>
    <td
      colSpan="7"
      className="py-24 text-center bg-white border-b border-gray-100"
    >
      <div className="flex flex-col items-center justify-center">
        {/* Spinner SVG animado */}
        <svg
          className="animate-spin h-10 w-10 text-[#239089] mb-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-100"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-sm font-medium text-gray-500 font-kodchasan animate-pulse">
          Obteniendo datos...
        </span>
      </div>
    </td>
  </tr>
);

function InventoryTable({
  products = [],
  isLoading = false,
  isAuthenticated = false, // <--- 1. NUEVA PROP DE SEGURIDAD
  onDelete,
  onRefresh,
  currentFilter,
  onFilterChange,
  onSearch,
  pagination,
}) {
  return (
    <section className="p-3 sm:p-5 font-kodchasan animate-fade-in-up">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-xl sm:rounded-xl overflow-hidden border border-gray-100">
          {/* Cabecera y Herramientas */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-5 bg-gray-50/50">
            {/* Barra de Búsqueda */}
              <SearchBar onSearch={onSearch} />

            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              {/* 2. PROTECCIÓN: Solo mostramos botones de escritura si está autenticado */}
              {isAuthenticated && (
                <>
                  {/* Botón de Alta */}
                  <ProductForm onProductAdded={onRefresh} />

                  {/* Botón Acciones (CSV, Borrar Todo) */}
                  {/* Se oculta para evitar borrados masivos accidentales por invitados */}
                  <ActionsDropdown
                    onBulkDelete={() => alert("Lógica de borrar todo aquí")}
                    products={products}
                  />
                </>
              )}

              <div className="flex items-center space-x-3 w-full md:w-auto">
                {/* Filtros (Visibles para todos) */}
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
                  <th scope="col" className="px-4 py-4">
                    Producto
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Categoría
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Marca
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Precio
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Imagen
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <MinimalLoader />
                ) : products.length === 0 ? (
                  /* Estado Vacío */
                  <tr>
                    <td colSpan="7" className="text-center py-16">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                          <svg
                            className="w-12 h-12 text-gray-300"
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
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">
                          Sin resultados
                        </h3>
                        <p className="text-sm">
                          No se encontraron productos con los filtros actuales.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  /* Renderizado de Productos */
                  products.map((item) => (
                    <TableRow
                      key={item._id}
                      {...item}
                      brand={item.brand || "Genérico"}
                      isAuthenticated={isAuthenticated} // <--- 3. PASAMOS SEGURIDAD A LA FILA
                      onDelete={onDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer de Paginación */}
          {!isLoading && products.length > 0 && (
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 border-t border-gray-100 bg-gray-50/50">
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
          )}
        </div>
      </div>
    </section>
  );
}

export default InventoryTable;
