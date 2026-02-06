function PaginationNav({ currentPage, totalPages, onPageChange }) {
  // Generamos el array de números de página
  const pages = [];

  // Nota: Si tienes muchísimas páginas (ej. 100), aquí deberíamos implementar
  // una lógica de "ventana" (1, 2, 3 ... 10). Por ahora, renderizamos todas.
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Navegación de inventario">
      <ul className="inline-flex items-center -space-x-px h-8 text-sm">
        {/* --- BOTÓN ANTERIOR --- */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`font-kodchasan flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg 
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
          >
            <span className="sr-only">Anterior</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {/* --- NÚMEROS DE PÁGINA --- */}
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`font-kodchasan flex items-center justify-center px-3 h-8 leading-tight border transition-colors
                ${
                  page === currentPage
                    ? "z-10 text-white bg-[#239089] border-[#239089] hover:bg-[#1b726d]" // Estilo Activo (Tu color Teal)
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" // Estilo Inactivo
                }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* --- BOTÓN SIGUIENTE --- */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`font-kodchasan flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg 
              ${
                currentPage === totalPages || totalPages === 0
                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
          >
            <span className="sr-only">Siguiente</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationNav;
