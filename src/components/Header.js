import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            ABC
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink  className="nav-link" to="/" activeClassName="active">
                  Iniciar sesion
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/registro" activeClassName="active">
                  Registrarte
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/usuarios" activeClassName="active">
                  Usuarios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/proveedores" activeClassName="active">
                  Proveedores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/productos" activeClassName="active">
                  Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aeropuertos" activeClassName="active">
                  Aeropuertos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/productos/proveedor" activeClassName="active">
                  Productos/Proveedor
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contenedores" activeClassName="active">
                  Contenedores
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
