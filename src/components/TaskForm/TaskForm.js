import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function TaskForm({ onSubmit, isRedirect }) {
  let history = useHistory();
  const { spaceId } = useParams();
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
  const goBack = () => {
    history.goBack();
  };
  console.log(state);

  return (
    <>
      {isRedirect ? <Redirect to={`/spaces/${spaceId}/task`} /> : null}
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
      <button onClick={goBack}>Cancelar</button>
    </>
  );
}

export default TaskForm;
