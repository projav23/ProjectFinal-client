import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { getUsers, getFile } from "../../service/spaces.service";
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

  const handleUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    const { data } = await getFile(uploadData);
    setState({ ...state, imgURL: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // parserToArray()
    console.log("state enviado", state);
    onSubmit(state);
  };

  return (
    <div className="createSpace">
      {isRedirect ? <Redirect to="/spaces" /> : null}
      <div>
        <p style={{ color: "transparent" }}>Create your space</p>
      </div>
      <div className="tarjeta">
        <p style={{fontSize:'2em'}}>¡Empieza ya!</p>
        <Form className="formBoot" id="form" onSubmit={handleSubmit}>
          <FormGroup>
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
            <Label for="exampleSelect">Tipo de espacio</Label>
            <Input
              bsSize="sm"
              type="select"
              name="type"
              onChange={handleChange}
              form="form"
              required
              id="exampleSelect"
            >
              <option selected={true} disabled="disabled">
                Selecciona el tipo
              </option>
              <option value="Grupal">Grupal</option>
              <option value="Personal">Personal</option>
            </Input>
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
              El peso maximo del archivo debenser 25MB.
            </FormText>
          </FormGroup>

          <FormGroup>
            <Label for="numero">Numero de inquilinos</Label>
            <InputGroup>
              <Input
                required
                id="numero"
                type="number"
                name="inquilinos"
                value={inputfieldsToAdd}
                onChange={(e) =>
                  setInputfieldsToAdd(parseInt(e.currentTarget.value, 10))
                }
              />
              <InputGroupAddon addonType="append">
                <InputGroupText  onClick={() => {
              setCommittedFieldsToAdd(inputfieldsToAdd);
            }} >+</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FormText color="muted">
              Minimo se requiere un usuario. Solo el creador tendra permisos para gestionar el espacio.
            </FormText>
          </FormGroup>
          {[...Array(committedFieldsToAdd)].map((item, index) => (
            <Input
              type="select"
              key={index}
              name={index}
              onChange={handleSelect}
              form="form"
            >
              <option disabled="disabled" selected="true">
                Seleccionar usuario
              </option>
              {users.map((user) => (
                <option value={user._id}>{user.username}</option>
              ))}
            </Input>
          ))}
        </Form>

        <div className="columna">
          <Button
            
            style={{ marginBottom: "5%", backgroundColor:'#343c44'}}
            form="form"
            type="submit"
          >
            Crear espacio
          </Button>
        </div>

        {/* <Form className="form-space" onSubmit={handleSubmit} id="form">
          <div className="row-space">
            <div className="columnaSpace">
              <label>Nombre del espacio*</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="columnaSpace">
              <label>Numero de inquilinos*</label>
              <input
                required
                type="number"
                name="inquilinos"
                value={inputfieldsToAdd}
                onChange={(e) =>
                  setInputfieldsToAdd(parseInt(e.currentTarget.value, 10))
                }
              />
            </div>
          </div>
          <div className="row-space">
            <div className="columnaSpace">
              <label>Tipo de espacio*</label>
              <select name="type" onChange={handleChange} form="form" required>
                <option selected="true" disabled="disabled">
                  Selecciona el tipo
                </option>
                <option value="Grupal">Grupal</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="columnaSpace">
              <label htmlFor="imagenSpace" className="custom-file-upload">
                Imagen
              </label>
              <input
                id="imagenSpace"
                type="file"
                name="image"
                value={state.image}
                onChange={handleUpload}
              />
            </div>
          </div>
          <div className="columnaSpace">
            <label>Descripcion*</label>
            <textarea
              type="text"
              name="description"
              value={state.description}
              onChange={handleChange}
              required
            />
          </div>
        </Form>
      </div>
      <button
        onClick={() => {
          setCommittedFieldsToAdd(inputfieldsToAdd);
        }}
      >
        Add users
      </button>
      {[...Array(committedFieldsToAdd)].map((item, index) => (
        <select key={index} name={index} onChange={handleSelect} form="form">
          <option disabled="disabled" selected="true">
            Seleccionar usuario
          </option>
          {users.map((user) => (
            <option value={user._id}>{user.username}</option>
          ))}
        </select>
      ))}
      <button form="form" type="submit">
        Crear nuevo espacio
      </button> */}
      </div>
    </div>
  );
}

export default FormSpace;
