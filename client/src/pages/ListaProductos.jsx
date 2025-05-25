import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/productos`);
    setProductos(res.data.productos);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/productos/${id}`);
      cargarProductos();
    }
  };

  return (
    <div className="card shadow-sm rounded border-1 my-4">
      <div className="card-body px-4 py-4">
        <h2 className="text-center mb-4">Lista de Productos</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    <Link
                      to={`/editar-producto/${producto._id}`}
                      className="btn btn-sm btn-primary me-1"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => eliminarProducto(producto._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};