import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearProducto } from "../services/productoService";

export const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProducto({
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      });
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error al agregar el producto");
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 my-4">
      <div className="card-body p-4">
        <h2 className="text-center mb-4">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="descripcion"
              value={formData.descripcion}
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
              value={formData.precio}
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
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              name="categoria"
              value={formData.categoria}
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

          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
