import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext.utils";
import { FiSettings, FiTrash2 } from "react-icons/fi";
import { deleteSpaceOne } from "../../service/spaces.service";
import './SpaceList.css'

const SpacesList = ({ space, onDelete }) => {
  const { user } = useAuth();
  const [edit, setEdit] = React.useState(null);
  let history = useHistory();
  const redirect = () => {
    history.push(`/spaces/${space._id}/edit`);
  };
  const canEdit = () => {
    if (user.user === space.owner) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  React.useEffect(() => {
    canEdit();
  }, []);
  const handleRemove = () => {
    onDelete(space._id);
    setModal(!modal);
  };

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Card style={{ margin: "10%", minWidth: "30%", backgroundColor:'#ffffffeb' }}>
        <Link key={space._id} to={`/spaces/${space._id}`}>
          <CardImg className='imagenEspacio' src={space.imgURL} alt="Card image cap" />
        </Link>
        <CardBody>
          <CardTitle tag="h5">{space.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {space.description}
          </CardSubtitle>
          {edit ? (
            <div
              style={{
                margin: "10%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <FiTrash2 size={24} onClick={toggle} color={"#343c44"}></FiTrash2>
              <FiSettings
                size={24}
                onClick={redirect}
                color={"#343c44"}
              ></FiSettings>
            </div>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>
          ¡Oye! Estas a punto de borrar el espacio '{space.name}'
        </ModalHeader>
        <ModalBody>
          <p>¿Confirmas que quieres borrarlo?</p>
          <Button color="danger" onClick={handleRemove}>
            Sí, borrar espacio
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SpacesList;
