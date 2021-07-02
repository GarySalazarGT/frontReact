import React, { useState, useEffect } from "react";
import { apiUrl } from "../App";
import { Redirect } from "react-router-dom";

const Register = () => {
  const initialState = {
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  };

  const stateToken = {
    token: "",
  };

  const statusUser = {
    status: "",
  };
  const dataReq = {
      user: {}
  }

  const nameRef = React.createRef();
  const lastnameRef = React.createRef();
  const phoneRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [credential, setCredential] = useState(initialState);
  const [token, setToken] = useState(stateToken);
  const [status, setStatus] = useState(statusUser);
  const [data, setDataReq] = useState(dataReq);

  useEffect(() => {
    if (data !== "" || data !== undefined) {
      return <Redirect to={"/inicio"} />;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCredential = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setCredential(newCredential);
    sendCredential(newCredential);
  };

  const sendCredential = async (credential) => {
    try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&name=" + encodeURIComponent(credential.name);
      dataForm += "&lastname=" + encodeURIComponent(credential.lastname);
      dataForm += "&phone=" + encodeURIComponent(credential.phone);
      dataForm += "&email=" + encodeURIComponent(credential.email);
      dataForm += "&password=" + encodeURIComponent(credential.password);
      const response = await fetch(`${apiUrl.link}registro`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: dataForm,
      });

      const data = await response.json();
      //console.log(data);
      setDataReq(data.data);
      
      return <Redirect to={"/inicio"} />;
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="mb-3 d-inline" style={{ maxWidth: "20rem" }}>
        <div className="card-body bg-black">
          <h2 className="card-title text-center">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                ref={nameRef}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                ref={lastnameRef}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="text"
                className="form-control"
                placeholder="Celular"
                ref={phoneRef}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo electronico"
                ref={emailRef}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contrasenia"
                ref={passwordRef}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="submit"
                value="Registrar"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
