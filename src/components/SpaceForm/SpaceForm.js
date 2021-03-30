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
  const [error, setError] = React.useState(false)
  const [committedFieldsToAdd, setCommittedFieldsToAdd] = React.useState(0);
  const [users, setUsers] = React.useState({});

  const getAllUsers = async () => {
    const { data } = await getUsers();

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
    if(state.users.length){
      onSubmit(state);
    } else
    setError({message: "No has añadido ningún usuario"})
    
    
  };

  return (
    <div className="createSpace">
      {isRedirect ? <Redirect to="/spaces" /> : null}

      <div className="tarjeta">
        <p style={{ fontSize: "2em" }}>¡Empieza ya!</p>
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
              <option value="" selected={true} disabled="disabled">
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
                <InputGroupText
                  onClick={() => {
                    setCommittedFieldsToAdd(inputfieldsToAdd);
                  }}
                >
                  +
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FormText color="muted">
              Minimo se requiere un usuario. Solo el creador tendra permisos
              para gestionar el espacio.
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
              <option disabled="disabled" selected={true}>
                Seleccionar usuario
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.username}</option>
              ))}
            </Input>
            
          ))}
          <p>{error.message}</p>
          <Button
            style={{
              marginBottom: "5%",
              marginTop: "10%",
              backgroundColor: "orange",
              border: "orange",
            }}
            form="form"
            type="submit"
          >
            Crear espacio
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FormSpace;
