import React, { useState, useEffect } from "react";
import { apiUrl } from "../App";
import { Redirect } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const stateToken = {
    token: "",
  };

  const statusUser = {
    status: "",
  };

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [credential, setCredential] = useState(initialState);
  const [token, setToken] = useState(stateToken);
  const [status, setStatus] = useState(statusUser);

  console.log(token, status);

  useEffect(() => {
    if (token !== "" || token !== undefined) {
      return <Redirect to={"/inicio"} />;
    }
  }, []);

  const sendCredential = async (credential) => {
    try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&email=" + encodeURIComponent(credential.email);
      dataForm += "&password=" + encodeURIComponent(credential.password);
      const response = await fetch(`${apiUrl.link}ingreso`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: dataForm,
      });

      const data = await response.json();
      const statusLogin = data.data.user.operationType;
      const dataReq = data.data.user.stsTokenManager;
      const getToken = dataReq.accessToken;
      setToken(getToken);
      setStatus(statusLogin);
      return <Redirect to={"/inicio"} />;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCredential = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setCredential(newCredential);
    sendCredential(newCredential);
  };

  return (
    <div className="container mt-3">
      <div className="mb-3 d-inline" style={{ maxWidth: "20rem" }}>
        <div className="card-body bg-black">
          <h2 className="card-title text-center">Iniciar Sesion</h2>
          <form onSubmit={handleSubmit}>
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
                value="Ingresar"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
