import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router";

function ChoresForm({ onSubmit, isRedirect }) {
  const { spaceId } = useParams();
  const [state, setState] = React.useState({ name: "", description:'' });

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      {isRedirect ? <Redirect to={`/spaces/${spaceId}/chores/`} /> : null}
      <form className="form-space" onSubmit={handleSubmit} id="form">
        <label>
          Nombre de la norma*
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripcion de la norma*
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
            required
          />
        </label>

      </form>

      <button form="form" type="submit">
        Crear norma
      </button>
    </>
  );
}

export default ChoresForm;
