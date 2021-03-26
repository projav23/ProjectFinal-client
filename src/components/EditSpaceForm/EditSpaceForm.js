import React from "react";
import { findSpace } from "../../service/spaces.service";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";
import { getUsers, getFile } from "../../service/spaces.service";
import { HiUserRemove } from "react-icons/hi";
import { IoPersonAdd } from "react-icons/io5";
import {
  Button,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import './EditSpaceForm.css'

const EditForm = ({ onSubmit, isRedirect }) => {
  const initialState = {
    name: "",
    users: [],
    description: "",
  }
  const { spaceId } = useParams();
  const [state, setState] = React.useState(initialState);
  const [users, setUsers] = React.useState({});

  const getAllUsers = async () => {
    const { data } = await getUsers();

    setUsers(data);
  };
  const getSpace = async () => {
    try {
      const { data } = await findSpace(spaceId);
      setState(data);
    } catch (e) {

    }
  };
  React.useEffect(() => {
    getSpace();
  }, []);
  React.useEffect(() => {
    getAllUsers();
  }, []);


  const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState(0);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    const { data } = await getFile(uploadData);
    setState({ ...state, imgURL: data });
  };

  const handleSelect = (e) => {
    const user = users.find((u) => e.target.value === u._id);
    setState((state) => ({
      ...state,
      users: [...state.users, { _id: user._id, username: user.username }],
    }));
    const array = [...Array(committedFieldsToAdd)];
    array.pop();
    setCommittedFieldsToAdd(array.length);
  };

  const handleRemoveClick = (idx, userId) => {
    const list = [...state.users];
    list.splice(idx, 1);
    setState({ ...state, users: list });
  };

  const handleRemoveClickAdded = (idx) => {
    const array = [...Array(committedFieldsToAdd)];
    array.splice(idx, 1);
    setCommittedFieldsToAdd(array.length);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = state.users.map((user) => user._id);

    setState({ ...state, users: newArr });

    onSubmit(state);
    setState(initialState)
  };

  const style = {
    height: '100vh',
    backgroundImage: `url(${state.imgURL})`,
    backgroundRepeat:'no-repeat' ,
    backgroundSize: 'cover',
    backgroundPosition: '30%',
    filter: 'opacity(90%)',
    display: "flex"
  }

  return (
    <div style={style}>
    <div style={{color:'transparent'}}>Hola</div>
      {isRedirect ? <Redirect to="/spaces" /> : null}
      <div className="tarjeta1">
      <br></br>
      <p style={{fontSize:'2em'}}>¿Necesitas un cambio? </p>
        <Form  className="formBoot" id="form" onSubmit={handleSubmit}>
          <FormGroup style={{marginTop:"10%"}}>
            <Label for="space-name">Nombre del espacio</Label>
            <Input
              bsSize="sm"
              id="space-name"
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              required
              placeholder="Ej: El Templo"
            />
          </FormGroup>
          <FormGroup>
            <Label for="textarea">Descripcion</Label>
            <Input
              bsSize="sm"
              type="textarea"
              name="description"
              value={state.description}
              onChange={handleChange}
              id="textarea"
              placeholder="Ej: Piso en el centro de Barcelona."
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="imagenSpace">Seleccionar imagen (Opcional)</Label>
            <CustomInput
              bsSize="sm"
              id="imagenSpace"
              type="file"
              name="image"
              value={state.image}
              onChange={handleUpload}
            />
            <FormText color="muted">
              El tamaño de la imagen debe ser 300 pixeles x 320 pixeles para su optima visualización.
            </FormText>
          </FormGroup>

          <FormGroup>
            <Label>Inquilinos: </Label>
            {state.users.map((user, idx) => (
              <InputGroup key={user._id}>
                <Input value={user.username} readOnly />
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    onClick={(e) => handleRemoveClick(idx, user._id)}
                  >
                    <HiUserRemove />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            ))}
          </FormGroup>
          {[...Array(committedFieldsToAdd)].map((item, index) => (
            <FormGroup key={index}>
              <InputGroup>
                <Input
                  type="select"
                  name={state.users.length}
                  onChange={handleSelect}
                  form="form"
                >
                  <option selected="true" disabled="disabled">
                    Selecciona usuario
                  </option>
                  {users.map((user) => (
                    <option name="id" value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <InputGroupText onClick={() => handleRemoveClickAdded(item)}>
                    <HiUserRemove />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          ))}
          <IoPersonAdd
          size={32}
          style={{ color: "#343c44" }}
          onClick={() => {
            setCommittedFieldsToAdd(committedFieldsToAdd + 1);
          }}
        ></IoPersonAdd>
        <br></br>
        <Button style={{ marginTop: "10%",marginBottom:'10%', background: "#343c44" }} form="form">
          {" "}
          Actualizar espacio
        </Button>
        </Form>

        
      </div>
    </div>
  );
};

export default EditForm;
