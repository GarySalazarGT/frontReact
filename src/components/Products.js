import React, { Component } from "react";
import { apiUrl } from "../App";
import CreateProduct from "./CreateProduct";

class Products extends Component {
  state = {
    products: [],
    flag: false,
  };

  getProducts = async () => {
    try {
      const response = await fetch(`${apiUrl.link}productos`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Authorization: `Bearer ${apiUrl.token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      this.setState({
        products: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteObject = async (id) => {
    try {
      const response = await fetch(`${apiUrl.link}producto/${id}`, {
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
    this.getProducts();
  }

  componentDidUpdate() {
    this.getProducts();
  }

  viewForm = (e) => {
    e.preventDefault();
    this.setState({
      flag: !this.state.flag,
    });
    console.log(this.state);
  };

  render() {
    console.log(apiUrl.link);
    console.log(this.state.products);

    return (
      <div className="container mt-4">
        <h3>Productos</h3>
        <button className="btn btn-success mb-3" onClick={this.viewForm}>
          Agregar
        </button>
        {this.state.flag && <CreateProduct />}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Presentacion</th>
              <th scope="col">Sku</th>
              <th scope="col">Volument</th>
              <th scope="col">Unidades</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products != undefined &&
              this.state.products.map((product) => {
                return (
                  <tr className="table-primary" key={product.productId}>
                    <th scope="row">{product.productId}</th>
                    <td>{product.name}</td>
                    <td>{product.display}</td>
                    <td>{product.sku}</td>
                    <td>{product.bulk}</td>
                    <td>{product.boxUnity}</td>
                    <div className="form-group">
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => this.deleteObject(product.productId)}
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

export default Products;
