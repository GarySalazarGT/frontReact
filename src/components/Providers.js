import React, { Component } from "react";
import { apiUrl } from "../App";
import CreateProvider from "./CreateProvider";

class Providers extends Component {
  state = {
    providers: [],
    flag: false,
  };

  getProvider = async () => {
    try {
      const response = await fetch(`${apiUrl.link}proveedores`, {
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
        providers: data.data,
      });
    } catch (error) {
      //console.log(error);
    }
  };

  deleteObject = async (id) => {
    try {
      const response = await fetch(`${apiUrl.link}proveedor/${id}`, {
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
    this.getProvider();
  }

  componentDidUpdate() {
    this.getProvider();
  }

  viewForm = (e) => {
    e.preventDefault();
    this.setState({
      flag: !this.state.flag,
    });
    console.log(this.state);
  };

  render() {
    //console.log(apiUrl.link);
    //console.log(this.state.providers);

    return (
      <div className="container mt-4">
        <h3>Proveedores</h3>
        <button className="btn btn-success mb-3" onClick={this.viewForm}>
          Agregar
        </button>
        {this.state.flag && <CreateProvider />}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.providers != undefined &&
              this.state.providers.map((provider) => {
                return (
                  <tr>
                    <th scope="row">{provider.providerId}</th>
                    <td>{provider.name}</td>
                    <td>{provider.description}</td>
                    <div className="form-group">
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => this.deleteObject(provider.providerId)}
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

export default Providers;
