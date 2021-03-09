import React from "react";
// import {useParams} from 'react-router-dom'

function FormTask({ onSubmit }) {
  const [state, setState] = React.useState({
    name: "",
    description: "",
    asignedTo: "",
  });
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la tarea
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripcion de la tarea
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Usuario asignado
          <input
            type="text"
            name="asignedTo"
            value={state.asignedTo}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear nueva tarea</button>
      </form>
    </>
  );
}

export default FormTask;
