import React from "react";

const EditForm = ({ onSubmit, state, isRedirect }) => {
  const [form, setForm] = React.useState({
    name: "",
    users: [],
    descriptionn: "",
  });
  const [committedFieldsToAdd,setCommittedFieldsToAdd] = React.useState(0)
  console.log("estado", state);
  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {" "}
        Nombre
        <input
          type="text"
          placeholder={state.name}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        {" "}
        Description
        <input
          placeholder={state.description}
          type="text"
          onChange={handleChange}
        ></input>
      </label>
      {/* <label>
        Imagen
        <input type="file"></input>
      </label> */}
      {state.users.map((user) => (
        <div>
          <input value={user._id} placeholder={user.username} />
          <button>Borrar usuario</button>
        </div>
      ))}
      {[...Array(committedFieldsToAdd)].map((item, index) => (
        <input key={Math.random()*1000} name='users' >
        </input>
      ))}
      <button
        onClick={() => {
          setCommittedFieldsToAdd(1);
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
