import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function ShoppingForm({ onSubmit, isRedirect }) {
  let history = useHistory();
  const { spaceId } = useParams();
  const [state, setState] = React.useState({
    name: "",
    quantity: 0,
  });
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };
  const goBack = () => {
    history.goBack();
  };
  console.log(state);

  return (
    <>
      {isRedirect ? <Redirect to={`/spaces/${spaceId}/shoppinglist`} /> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Comprar:
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Cantidad a comprar
          <input
            type="number"
            name="quantity"
            value={state.quantity}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Añadir a la lista de la compra</button>
      </form>
      <button onClick={goBack}>Cancelar</button>
    </>
  );
}

export default ShoppingForm;