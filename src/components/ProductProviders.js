import React, { Component } from "react";
import { apiUrl } from "../App";

class ProductProviders extends Component {
  state = {
    productProviders: [],
  };

  getProductProviders = async () => {
    try {
      const response = await fetch(`${apiUrl.link}producto/proveedor`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Authorization: `Bearer ${apiUrl.token}`,
        },
      });

      const data = await response.json();
      //console.log(data);

      this.setState({
        productProviders: data.data,
      });
    } catch (error) {
      //console.log(error);
    }
  };

  deleteObject = async (id) => {
    try {
      const response = await fetch(`${apiUrl.link}delete-privote-product/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Authorization: `Bearer ${apiUrl.token}`,
          params: `id ${id}`
        },
      });

      const data = await response.json();
    } catch (error) {
      //console.log(error);
    }
  };

  componentDidMount() {
    this.getProductProviders();
  }

  componentDidUpdate() {
    this.getProductProviders();
  }

  render() {
    //console.log(apiUrl.link);
    //console.log(this.state.productProviders);

    return (
      <div className="container mt-4">
        <h3>Productos/Proveedores</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Pais/Ciudad</th>
              <th scope="col">Pais/Ciudad arribo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productProviders != undefined &&
              this.state.productProviders.map((pProvider) => {
                return (
                  <tr className="table-primary" key={pProvider.aeroportId}>
                    <th scope="row">{pProvider.aeroportId}</th>
                    <td>{pProvider.name}</td>
                    <td>{pProvider.country}</td>
                    <td>{pProvider.arrivalPlace}</td>
                    <div className="form-group">
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => this.deleteObject(pProvider.aeroportId)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductProviders;
