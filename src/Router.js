import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Importar los componenetes a utilizar */
import Header from "./components/Header";
import Login from "./components/Login";
import Register from './components/Register';
import Loyout from './components/Loyout';
import Home from './components/Home';
import Users from './components/Users';
import Providers from './components/Providers';
import Products from "./components/Products";
import Aeroports from "./components/Aeroports";
import ProductProviders from "./components/ProductProviders";
import Containers from "./components/Containers";
/* Importar los componenetes a utilizar */

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
        </>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registro" component={Register} />
          <Route exact path="/cerrar" component={Loyout} />
          <Route exact path="/inicio" component={Home} />
          <Route exact path="/usuarios" component={Users} />
          <Route exact path="/proveedores" component={Providers} />
          <Route exact path="/productos" component={Products} />
          <Route exact path="/aeropuertos" component={Aeroports} />
          <Route exact path="/productos/proveedor" component={ProductProviders} />
          <Route exact path="/contenedores" component={Containers} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
