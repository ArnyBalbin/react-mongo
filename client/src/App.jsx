import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ListaProductos } from "./pages/ListaProductos";
import { AgregarProducto } from "./pages/AgregarProducto";
import { EditarProducto } from "./pages/EditarProducto";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<ListaProductos />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} />
          <Route path="/editar-producto/:id" element={<EditarProducto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;