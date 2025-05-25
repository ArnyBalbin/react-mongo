import { Link } from "react-router-dom";

export const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-3 rounded shadow-sm px-3">
    <Link className="navbar-brand" to="/">
      <i className="fas fa-tasks me-2"></i>Practica 1 - CRUD
    </Link>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            <i className="fas fa-home me-1"></i>Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/agregar-producto">
            <i className="fas fa-plus me-1"></i>Añadir Producto
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);