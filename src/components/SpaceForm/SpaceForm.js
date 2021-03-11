import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { getUsers } from "../../service/spaces.service";

function FormSpace({ onSubmit, isRedirect }) {
  const [state, setState] = React.useState({ name: "", users:[] });
  const [inputfieldsToAdd, setInputfieldsToAdd] = React.useState(1);
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState(0);
  const [users, setUsers] = React.useState({});
  console.log("state global", state)
  const getAllUsers = async () => {
    const { data } = await getUsers();
    console.log("Usuarios", data);
    setUsers(data);
  };
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      {isRedirect ? <Redirect to="/spaces" /> : null}
      <form onSubmit={handleSubmit} id="form">
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
          Descripcion
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Numero de inquilinos
          <input
            type="number"
            name="inquilinos"
            value={inputfieldsToAdd}
            onChange={(e) =>
              setInputfieldsToAdd(parseInt(e.currentTarget.value, 10))
            }
          />
        </label>
      </form>
      <button
        onClick={() => {
          setCommittedFieldsToAdd(inputfieldsToAdd);
        }}
      >
        Add users
      </button>
      {[...Array(committedFieldsToAdd)].map((index) => (

        <div>
            <label>User</label>
            <select name="users" onChange={handleChange} form="form">
              {users.map((user) => (
                <option value={user._id}>{user.username}</option>
              ))}
            </select>
        </div>
      ))}
      <button form="form" type="submit">
        Crear nuevo espacio
      </button>
    </>
  );
}
// const Field = ({ change, users }) => (
//   <div>
//     <label>User</label>
//     <select name="users" onChange={change} form="form">
//       {users.map((user) => (
//         <option value={users._id}>{user.username}</option>
//       ))}
//     </select>
//   </div>
// );

        /* <Field key={index} users={users} change={handleChange} /> */
export default FormSpace;
