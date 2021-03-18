import React from "react";
import { findSpace } from "../../service/spaces.service";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";
import { getUsers, getFile } from "../../service/spaces.service";


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

  const handleUpload = async (e) =>{
    const uploadData = new FormData()
    uploadData.append('file', e.target.files[0])
    const {data} = await getFile(uploadData)
    setState({...state, imgURL: data})
  }

  const handleSelect = (e) => {
    const user = users.find(u => e.target.value === u._id);
    setState((state) => ({
      ...state,
      users: [...state.users, {_id: user._id, username: user.username } ],
    }));
    const array = [...Array(committedFieldsToAdd)]
    array.pop()
    setCommittedFieldsToAdd(array.length)
  };

  const handleRemoveClick = (idx, userId) => {
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
    const newArr = state.users.map(user => user._id)
    console.log('newArr', newArr)
    setState({...state, users: newArr})
    console.log("state enviado", state)
    onSubmit(state);
  };


  return (
    <>
    {isRedirect ? <Redirect to='/spaces' /> : null}
    <form onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name='name' type="text" placeholder={state.name} onChange={handleChange}></input>
      </label>
      <label>
        Description
        <input name='description' placeholder={state.description} onChange={handleChange} type="text"></input>
      </label>
      <label>
        Imagen
        <input name='imgURL' onChange={handleUpload} type="file"></input>
      </label>

      {state.users.map((user, idx) => (
        <div key={user._id}>
          <input value={user.username}  readOnly />
          <button
            type="button"
            onClick={(e) => handleRemoveClick(idx, user._id)}
          >
            Borrar usuario
          </button>
        </div>
      ))}
      {[...Array(committedFieldsToAdd)].map((item, index) => (
        <div key={index}>
          <select  name={state.users.length} onChange={handleSelect} form="form">
            <option selected='true' disabled='disabled'>Selecciona usuario</option>
            {users.map((user) => (
              <option name="id" value={user._id}>{user.username}</option>
            ))}
          </select>
          <button onClick={() => handleRemoveClickAdded(item)}>
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
    </>
  );
};

export default EditForm;


