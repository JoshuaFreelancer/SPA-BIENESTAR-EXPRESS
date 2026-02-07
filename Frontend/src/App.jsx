import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/common/Header";
import InventoryTable from "./components/common/InventoryTable";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [products, setProducts] = useState([]);

  // 1. ESTADO DE AUTENTICACIÓN
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth-token")
  );

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // --- SOLUCIÓN DEL LOGIN/LOGOUT ---
  useEffect(() => {
    // Función que revisa el token real
    const checkAuth = () => {
      const hasToken = !!localStorage.getItem("auth-token");
      setIsAuthenticated(hasToken);
      console.log("Estado de autenticación actualizado:", hasToken); // Debug
    };

    // Escuchamos el evento estándar de storage (para otras pestañas)
    window.addEventListener('storage', checkAuth);
    
    // Escuchamos NUESTRO evento personalizado (para la misma pestaña)
    window.addEventListener('auth-change', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const fetchProducts = async (currentPage, filterValue, searchValue) => {
    setIsLoading(true);
    setError(null);

    try {
      let url = `${API_URL}/api/products?page=${currentPage}&limit=10`;

      if (filterValue && filterValue !== "all") {
        url += `&filter=${filterValue}`;
      }

      if (searchValue) {
        url += `&search=${encodeURIComponent(searchValue)}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.ok) {
        setProducts(result.data);
        setTotalPages(result.totalPages);
        setTotalItems(result.total);
        setPage(result.page);
      } else {
        setProducts([]);
        setTotalItems(0);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, currentFilter, searchTerm);
  }, [page, currentFilter, searchTerm]);

  const handleFilterChange = (newFilter) => {
    setCurrentFilter(newFilter);
    setPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleRefresh = () => {
    fetchProducts(page, currentFilter, searchTerm);
  };

  const handleProductDeleted = (deletedId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== deletedId),
    );
  };

  if (isFirstLoad) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f0fdfa]">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-[#239089] mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold text-[#239089] font-kodchasan animate-pulse">
            Bienestar Express
          </h1>
          <p className="text-primary-600/60 font-kodchasan text-sm mt-2">
            Cargando sistema...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen font-kodchasan"
      style={{
        backgroundColor: "#f0fdfa",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23239089' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "font-kodchasan font-medium",
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#134e4a",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
          success: {
            iconTheme: { primary: "#0d9488", secondary: "#f0fdfa" },
            style: { border: "1px solid #ccfbf1" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
            style: { border: "1px solid #fee2e2" },
          },
        }}
      />

      <Header />

      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm">
              <p className="font-bold text-xl mb-2 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {error}
              </p>
              <button
                onClick={handleRefresh}
                className="underline hover:text-red-900 w-full text-center"
              >
                Intentar nuevamente
              </button>
            </div>
          </div>
        ) : (
          <InventoryTable
            products={products}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated} 
            onDelete={handleProductDeleted}
            onRefresh={handleRefresh}
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            pagination={{
              page: page,
              totalPages: totalPages,
              totalItems: totalItems,
              onPageChange: (newPage) => setPage(newPage),
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;