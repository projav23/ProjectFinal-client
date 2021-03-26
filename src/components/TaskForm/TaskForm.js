import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getUsersBySpace } from "../../service/tasks.service";

function TaskForm({ onSubmit, isRedirect }) {
  let history = useHistory();
  const { spaceId } = useParams();
  const [users, setUsers] = React.useState([]);
  const [state, setState] = React.useState({
    name: "",
    description: "",
    endData:"",
    asignedTo: "",
  });
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const getUsersAll = async () => {
    try {
      const { data } = await getUsersBySpace(spaceId);

      setUsers(data);
    } catch (e) {

    }
  };
  React.useEffect(() => {
    getUsersAll();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };
  const goBack = () => {
    history.goBack();
  };


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
          <select type="text" name="asignedTo"  onChange={handleChange}>
          <option selected='true' disabled='disabled'>Seleccionar usuario</option>
          {
            users.map((user)=>(
              <option value={user._id}>{user.username}</option>
            ))
          }
          </select>
        </label>
        <label>Fecha de fin 
          <input type='date' name='endData' value={state.endData} onChange={handleChange}/>
        </label>
        <button type="submit">Crear nueva tarea</button>
      </form>
      <button onClick={goBack}>Cancelar</button>
    </>
  );
}

export default TaskForm;
