import React, { useEffect, useState } from 'react';
import Header from './components/common/Header';
import InventoryTable from './components/common/InventoryTable';
import './App.css';

function App() {
  // Recopilar los porductos desde la api
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    await fetch("http://localhost:5000/api/productos")
      .then((response) => response.json())
      .then((products) => {
        setData([...data, ...products.data]);
        setIsLoading(false)
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {/* Pasar los datos como prop a InventoryTable */}
      <InventoryTable data={data} />
      {/* Aquí puedes agregar el enrutador y otras partes de tu aplicación */}
    </div>
  );
}

export default App;
