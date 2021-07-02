import React, { Component } from "react";
import { apiUrl } from "../App";

class Users extends Component {
  state = {
    users: [],
  };

  getUsers = async () => {
    try {
      const response = await fetch(`${apiUrl.link}ususarios`, {
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
        users: data.data,
      });
    } catch (error) {
      //console.log(error);
    }
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    //console.log(apiUrl.link);
    //console.log(this.state.users);

    return (
      <div className="container mt-4">
        <h3>Usuarios</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Telefono</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users != undefined &&
              this.state.users.map((user) => {
                return (
                  <tr className="table-primary">
                    <th scope="row">{user.userId}</th>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
