import React, { Component } from "react";
import { apiUrl } from "../App";
import CreateContainer from "./CreateContainer";

class Containers extends Component {
  state = {
    containers: [],
  };

  getContainers = async () => {
    try {
      const response = await fetch(`${apiUrl.link}contenedores`, {
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
        containers: data.data,
      });
    } catch (error) {
      //console.log(error);
    }
  };

  deleteObject = async (id) => {
    try {
      const response = await fetch(`${apiUrl.link}contenedor/${id}`, {
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
    this.getContainers();
  }

  componentDidUpdate() {
    this.getContainers();
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
    //console.log(this.state.containers);

    return (
      <div className="container mt-4">
        <h3>Contenedores</h3>
        <button className="btn btn-success mb-3" onClick={this.viewForm}>
          Agregar
        </button>
        {this.state.flag && <CreateContainer />}
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
            {this.state.containers != undefined &&
              this.state.containers.map((container) => {
                return (
                  <tr className="table-primary" key={container.aeroportId}>
                    <th scope="row">{container.aeroportId}</th>
                    <td>{container.name}</td>
                    <td>{container.country}</td>
                    <td>{container.arrivalPlace}</td>
                    <div className="form-group">
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => this.deleteObject(container.aeroportId)}
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

export default Containers;
