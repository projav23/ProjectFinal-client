import React from "react";
import { Redirect } from "react-router";

function FormSpace({onSubmit, isRedirect}) {
  const [state, setState] = React.useState({name:"", inquilinos:""})


  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <>
    {isRedirect ? (<Redirect to='/spaces'/>) : null}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del espacio
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Numero de inquilinos
          <input
            type="number"
            name="inquilinos"
            value={state.inquilinos}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Crear nuevo espacio</button>
      </form>
    </>
  );
}

export default FormSpace;
