function PaginationInfo({ currentPage, itemsPerPage, totalItems }) {
  // Cálculo seguro: si no hay items, empezamos en 0
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  // El último ítem nunca puede ser mayor que el total real
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
    <span className="text-sm font-kodchasan text-gray-500 dark:text-gray-400">
      Mostrando{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {startItem}-{endItem}
      </span>{" "}
      de{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {totalItems}
      </span>
    </span>
  );
}

export default PaginationInfo;
