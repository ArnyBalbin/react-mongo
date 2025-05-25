import Producto from '../models/Producto.js';

// Listar productos con paginación
export const listarProductos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const productos = await Producto.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Producto.countDocuments();

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      productos,
    });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error: err.message });
  }
};

// Obtener un producto por ID
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener el producto', error: err.message });
  }
};

// Agregar un nuevo producto
export const agregarProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  if (!nombre || !descripcion || precio == null || stock == null || !categoria) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevo = new Producto({ nombre, descripcion, precio, stock, categoria });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Error de validación', detalles: err.errors });
    }
    res.status(500).json({ mensaje: 'Error al guardar el producto', error: err.message });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    // Actualiza solo los campos enviados (evita undefined)
    if (nombre !== undefined) producto.nombre = nombre;
    if (descripcion !== undefined) producto.descripcion = descripcion;
    if (precio !== undefined) producto.precio = precio;
    if (stock !== undefined) producto.stock = stock;
    if (categoria !== undefined) producto.categoria = categoria;

    const actualizado = await producto.save();
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar', error: err.message });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.deleteOne();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: err.message });
  }
};
