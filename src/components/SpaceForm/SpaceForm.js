import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { getUsers, getFile} from "../../service/spaces.service";
import "./SpaceForm.css";

function FormSpace({ onSubmit, isRedirect }) {
  const [state, setState] = React.useState({ name: "", users: [] });
  const [inputfieldsToAdd, setInputfieldsToAdd] = React.useState(1);
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState(0);
  const [users, setUsers] = React.useState({});
  console.log("state global", state);
  const getAllUsers = async () => {
    const { data } = await getUsers();
    console.log("Usuarios", data);
    setUsers(data);
  };
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSelect = ({ target }) => {
    setState((state) => ({
      ...state,
      users: Object.values({ ...state.users, [target.name]: target.value }),
    }));
    console.log("state select", state);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpload = async (e) =>{
    const uploadData = new FormData()
    uploadData.append('file', e.target.files[0])
    const {data} = await getFile(uploadData)
    setState({...state, imgURL: data})
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // parserToArray()
    console.log("state enviado", state);
    onSubmit(state);
  };

  return (
    <>
      {isRedirect ? <Redirect to="/spaces" /> : null}
      <form
        className="form-space"
        onSubmit={handleSubmit}
        id="form"
      >
        <label>
          Nombre del espacio*
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripcion*
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen del espacio
          <input
            type="file"
            name="image"
            value={state.image}
            onChange={handleUpload}
          />
        </label>
        <label>
          Tipo de espacio*
          <select name="type" onChange={handleChange} form="form" required>
            <option selected>Selecciona el tipo</option>
            <option value="Grupal">Grupal</option>
            <option value="Personal">Personal</option>
          </select>
        </label>

        <label>
          Password*
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Numero de inquilinos*
          <input
            required
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
      {[...Array(committedFieldsToAdd)].map((item, index) => (
        <select key={index} name={index} onChange={handleSelect} form="form">
          {users.map((user) => (
            <option value={user._id}>{user.username}</option>
          ))}
        </select>
      ))}
      <button form="form" type="submit">
        Crear nuevo espacio
      </button>
    </>
  );
}

export default FormSpace;
