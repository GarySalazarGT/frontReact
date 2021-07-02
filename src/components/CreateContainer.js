import React, { useState, useEffect } from "react";
import { apiUrl } from "../App";

const CreateContainer = (props) => {
  const initialState = {
      name: '',
      airoport: '',
  };

  const nameRef = React.createRef();
  const airoportRef = React.createRef();

  const [object, setObject] = useState(initialState);

  const seveAeroport = async (object) => {
    try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&name=" + encodeURIComponent(object.name);
      dataForm += "&airoport=" + encodeURIComponent(object.airoport);
      const response = await fetch(`${apiUrl.link}contenedores`, {
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
      setObject(initialState)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
      
    e.preventDefault();
    const newObject = {
      name: nameRef.current.value,
      airoport: airoportRef.current.value,
    };
    setObject(newObject);
    console.log(object);
    seveAeroport(object)
  };

  return (
    <div className="mb-3 d-inline" style={{ maxWidth: "20rem" }}>
      <div className="card-body bg-black">
        <h2 className="card-title text-center">Crear Contenedor</h2>
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
              placeholder="Pais de destino"
              ref={airoportRef}
            />
          </div>
          <div className="form-group p-2">
            <input type="submit" value="Crear" className="btn btn-success" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContainer;
