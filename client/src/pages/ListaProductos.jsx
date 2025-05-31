import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos, eliminarProducto } from "../services/productoService";

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await obtenerProductos();
      setProductos(res.data.productos);
    } catch (error) {
      alert("Error al cargar productos");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await eliminarProducto(id);
        cargarProductos();
      } catch (error) {
        alert("Error al eliminar el producto");
      }
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
                    <Link to={`/editar-producto/${producto._id}`} className="btn btn-sm btn-primary me-1">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button onClick={() => handleEliminar(producto._id)} className="btn btn-sm btn-danger">
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
