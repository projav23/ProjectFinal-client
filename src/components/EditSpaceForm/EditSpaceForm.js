import React from "react";
import { findSpace } from "../../service/spaces.service";
import { useParams } from "react-router-dom";
import { getUsers } from "../../service/spaces.service";


const EditForm = ({ onSubmit, isRedirect }) => {
  const { spaceId } = useParams();
  const [state, setState] = React.useState({
    name: "",
    users: [],
    description: "",
  });
  const [users, setUsers] = React.useState({});

  const getAllUsers = async () => {
    const { data } = await getUsers();
    console.log('users',data)
    setUsers(data);
  };
  const getSpace = async () => {
    try {
      const { data } = await findSpace(spaceId);
      setState(data);
    } catch (e) {
      console.error(e);
    }
  };
  React.useEffect(() => {
    getSpace();
  }, []);
  React.useEffect(() => {
    getAllUsers();
  }, []);

  // const [inputList, setInputList] = React.useState(state.users);
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState(0);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSelect = ({ target }) => {
    setState((state) => ({
      ...state,
      users: Object.values({ ...state.users, [target.name]: target.value }),
    }));
    const array = [...Array(committedFieldsToAdd)]
    array.pop()
    setCommittedFieldsToAdd(array.length)
 
  };

  const handleRemoveClick = (id, idx, e) => {
    const list = [...state.users];
  
    list.splice(idx, 1);
    setState({ ...state, users: list });

  };

  const handleRemoveClickAdded = (idx) => {
    
    const array = [...Array(committedFieldsToAdd)]
    array.splice(idx,1)
    setCommittedFieldsToAdd(array.length)
    // array.splice(idx, 1)
    // // const newArray = array.pop()
    
 
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  console.log('estado', state)
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name='name' type="text" placeholder={state.name} onChange={handleChange}></input>
      </label>
      <label>
        Description
        <input name='description' placeholder={state.description} onChange={handleChange} type="text"></input>
      </label>
      {/* {inputList.map((x, i) => {
        return (
          <div>
            <input
              name="username"
              placeholder={x.username}
              value={x.username}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div>
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })} */}
      {state.users.map((user, idx) => (
        <div>
          <input value={user.username} placeholder={user.username} readOnly />
          <button
            type="button"
            onClick={(e) => handleRemoveClick(idx, user._id)}
          >
            Borrar usuario
          </button>
        </div>
      ))}
      {[...Array(committedFieldsToAdd)].map((item, index) => (
        <div>
          <select key={index} name={state.users.length} onChange={handleSelect} form="form">
            <option selected='true' disabled='disabled'>Selecciona usuario</option>
            {users.map((user) => (
              <option  value={user._id}>{user.username}</option>
            ))}
          </select>
          <button onClick={() => handleRemoveClickAdded(index)}>
            Borrar usuario
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setCommittedFieldsToAdd(committedFieldsToAdd + 1);
        }}
      >
        Add users
      </button>
      <br></br>
      <button>Actualizar espacio</button>
    </form>
  );
};

export default EditForm;


