import React, { Component } from "react";
import { apiUrl } from "../App";
import CreateAeroport from "./CreateAeroport";

class Aeroports extends Component {
  state = {
    aeroports: [],
    aeroport: {},
    flag: false
  };

  nameRef = React.createRef();
  country = React.createRef();
  

  getAeroports = async () => {
    try {
      const response = await fetch(`${apiUrl.link}aeropuertos`, {
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
        aeroports: data.data,
      });
    } catch (error) {
      //console.log(error);
    }
  };

  viewForm = (e) => {
    e.preventDefault();
    this.setState({
      flag: !this.state.flag
    })
    console.log(this.state);
    
  }

  saveAeroport = async () => {
    if (this.state.aeroport !== "" || this.state.aeroport !== undefined) {
      try {
        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&name=" + encodeURIComponent(this.state.name);
        dataForm += "&country=" + encodeURIComponent(this.state.country);
        dataForm += "&arrivalPlace=" + encodeURIComponent(this.state.arrivalPlace);
        const response = await fetch(`${apiUrl.link}aeropuertos`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Authorization: `Bearer ${apiUrl.token}`,
          },
          body: dataForm,
        });

        const data = await response.json();
        console.log(data);
        this.getAeroports()
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteObject = async (id) => {
    try {
      const response = await fetch(`${apiUrl.link}aeropuerto/${id}`, {
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
    this.getAeroports();
  }

  componentDidUpdate() {
    this.getAeroports();
  }

  render() {
    //console.log(apiUrl.link);
    //console.log(this.state.aeroports);

    return (
      <div className="container mt-4 mb-4">
        <h3>Aeropuertos</h3>
        <button className="btn btn-success mb-3" onClick={this.viewForm}>
          Agregar
        </button>
        {this.state.flag &&
           <CreateAeroport />
        }
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
            {this.state.aeroports.map((aeroport) => {
              return (
                <tr className="table-primary" key={aeroport.aeroportId}>
                  <th scope="row">{aeroport.aeroportId}</th>
                  <td>{aeroport.name}</td>
                  <td>{aeroport.country}</td>
                  <td>{aeroport.arrivalPlace}</td>
                  <div className="form-group">
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => this.deleteObject(aeroport.aeroportId)}
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

export default Aeroports;
