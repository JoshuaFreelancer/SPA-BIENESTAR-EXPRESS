import React from "react";

function PaginationInfo({ currentPage, itemsPerPage, totalItems }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
   
      <span className="text-sm font-kodchasan text-gray-500 dark:text-gray-400">
        Mostrando{" "}
        <span className="font-kodchasan font-semibold text-black dark:text-white">
          {totalItems > 0 ? startItem : 0}-{totalItems > 0 ? endItem : 0}
        </span>{" "}
        de{" "}
        <span className="font-kodchasan font-semibold text-black dark:text-white">
          {totalItems}
        </span>
      </span>
  
  );
}

export default PaginationInfo;
