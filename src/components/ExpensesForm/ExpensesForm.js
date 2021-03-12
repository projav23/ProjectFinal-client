import React from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";

const ExpensesForm = ({ onSubmit, isRedirect }) => {
  const [state, setState] = React.useState({ name: "", price: 0, type: "" });
  const { spaceId } = useParams();
  let history = useHistory();


  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      {isRedirect ? <Redirect to={`/spaces/${spaceId}/expenses`} /> : null}
      <form onSubmit={handleSubmit} id="form">
        <label>
          Nombre del gasto
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="price"
            value={state.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Tipo de gasto
          <select name="type" form="form" onChange={handleChange}>
            <option value="Recibos">Recibos</option>
            <option value="Otros">Otros gastos</option>
          </select>
        </label>
        <button type="submit">Crear nuevo gasto</button>
      </form>

    </>
  );
};

export default ExpensesForm;
