import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProducto, actualizarProducto } from "../services/productoService";

export const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: ""
  });

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const res = await obtenerProducto(id);
        setProducto({
          ...res.data,
          precio: res.data.precio.toString(),
          stock: res.data.stock.toString()
        });
      } catch (error) {
        alert("Error al cargar el producto");
        navigate("/");
      }
    };
    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarProducto(id, {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock),
        categoria: producto.categoria
      });
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error al actualizar");
    }
  };

  return (
    <div className="card shadow border-0 rounded-4 my-4">
      <div className="card-body p-4">
        <h2 className="text-center mb-4">Editar Producto</h2>

        {producto.nombre ? (
          <form onSubmit={handleSubmit}>
            {/* ... campos como antes ... */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={producto.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                <option value="Celulares">Celulares</option>
                <option value="Mouse">Mouse</option>
                <option value="Monitores">Monitores</option>
                <option value="Teclados">Teclados</option>
              </select>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center">Cargando producto...</p>
        )}
      </div>
    </div>
  );
};
