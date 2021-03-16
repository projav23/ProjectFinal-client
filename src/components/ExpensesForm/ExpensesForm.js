import React from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";

const ExpensesForm = ({ onSubmit, isRedirect }) => {
  const [state, setState] = React.useState({ name: "", price: '', type: "" });
  const { spaceId } = useParams();
  let history = useHistory();


  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  const goBack = () =>{
    history.push(`/spaces/${spaceId}/expenses`)
  }

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
            placeholder='Ej: Aquiler'
            onChange={handleChange}
          />
        </label>
        <label>
          Descripcion del gasto
          <input
            type="text"
            name="description"
            value={state.description}
            placeholder='Ej: Es el pago mensual del aquiler'
            onChange={handleChange}
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="price"
            value={state.price}
            placeholder='Ej: 700'
            onChange={handleChange}
          />
        </label>
        <label>
          Tipo de gasto
          <select name="type" form="form" onChange={handleChange}>
            <option selected='true' disabled='disabled'>Selecciona una opcion</option>
            <option value="Recibos">Recibos</option>
            <option value="Otros">Otros gastos</option>
          </select>
        </label>
        <button type="submit">Crear nuevo gasto</button>
      </form>
      <button onClick={goBack}>Cancel</button>

    </>
  );
};

export default ExpensesForm;
