import express from 'express';
import {
  listarProductos,
  obtenerProducto,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js';

const router = express.Router();

router.get('/', listarProductos);
router.get('/:id', obtenerProducto);
router.post('/', agregarProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;
