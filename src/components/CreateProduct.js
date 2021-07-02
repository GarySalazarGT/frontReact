import React, { useState, useEffect } from "react";
import { apiUrl } from "../App";

const CreateProduct = () => {
  const initialState = {
    boxUnity: "",
    bulk: "",
    display: "",
    name: "",
    sku: "",
  };

  const boxUnityRef = React.createRef();
  const bulkRef = React.createRef();
  const displayRef = React.createRef();
  const nameRef = React.createRef();
  const skuRef = React.createRef();

  const [object, setObject] = useState(initialState);

  const save = async (object) => {
    try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&name=" + encodeURIComponent(object.name);
      dataForm += "&boxUnity=" + encodeURIComponent(object.boxUnity);
      dataForm += "&bulk=" + encodeURIComponent(object.bulk);
      dataForm += "&display=" + encodeURIComponent(object.display);
      dataForm += "&sku=" + encodeURIComponent(object.sku);
      const response = await fetch(`${apiUrl.link}productos`, {
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
      boxUnity: boxUnityRef.current.value,
      bulk: bulkRef.current.value,
      display: displayRef.current.value,
      name: nameRef.current.value,
      sku: skuRef.current.value,
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
              placeholder="Presentacion"
              ref={displayRef}
            />
          </div>
          <div className="form-group p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Volumen"
              ref={bulkRef}
            />
          </div>
          <div className="form-group p-2">
            <input
              type="text"
              className="form-control"
              placeholder="SKU"
              ref={skuRef}
            />
          </div>
          <div className="form-group p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Unidades"
              ref={boxUnityRef}
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

export default CreateProduct;
