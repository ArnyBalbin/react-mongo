import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import conexionDatabase from './config/db.js';
import productoRoutes from './routes/producto.routes.js';

dotenv.config();

conexionDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/productos', productoRoutes);
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
