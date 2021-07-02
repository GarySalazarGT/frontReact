import React, { useState, useEffect } from "react";
import { apiUrl } from "../App";

const CreateAeroport = (props) => {
  const initialState = {
      name: '',
      country: '',
      arrivalPlace: ''
  };

  const nameRef = React.createRef();
  const countryRef = React.createRef();
  const arrivalPlaceRef = React.createRef();

  const [object, setObject] = useState(initialState);

  const seveAeroport = async (object) => {
    try {
      let dataForm = "_method=" + encodeURIComponent("POST");
      dataForm += "&name=" + encodeURIComponent(object.name);
      dataForm += "&country=" + encodeURIComponent(object.country);
      dataForm += "&arrivalPlace=" + encodeURIComponent(object.arrivalPlace);
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
      setObject(initialState)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
      console.log(nameRef, countryRef, arrivalPlaceRef);
      
    e.preventDefault();
    const newObject = {
      name: nameRef.current.value,
      country: countryRef.current.value,
      arrivalPlace: arrivalPlaceRef.current.value,
    };
    setObject(newObject);
    console.log(object);
    seveAeroport(object)
  };

  return (
    <div className="mb-3 d-inline" style={{ maxWidth: "20rem" }}>
      <div className="card-body bg-black">
        <h2 className="card-title text-center">Crear Aeropuerto</h2>
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
              placeholder="Pais de origen"
              ref={countryRef}
            />
          </div>
          <div className="form-group p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Pais de destino"
              ref={arrivalPlaceRef}
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

export default CreateAeroport;
