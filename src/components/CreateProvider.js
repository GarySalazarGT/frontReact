import React, { useState, useEffect } from "react";
import { apiUrl } from "../App";

const CreateProvider = () => {
  const initialState = {
    name: "",
    description: "",
  };

  const nameRef = React.createRef();
  const descriptionRef = React.createRef();

  const [object, setObject] = useState(initialState);

  const save = async (object) => {
    try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&name=" + encodeURIComponent(object.name);
      dataForm += "&description=" + encodeURIComponent(object.description);
      const response = await fetch(`${apiUrl.link}proveedores`, {
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
      setObject(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObject = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };
    setObject(newObject);
    console.log(object);
    save(object);
  };

  return (
    <div className="mb-3 d-inline" style={{ maxWidth: "20rem" }}>
      <div className="card-body bg-black">
        <h2 className="card-title text-center">Crear Producto</h2>
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
              placeholder="Descripcion"
              ref={descriptionRef}
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

export default CreateProvider;
