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
import { deleteSpaceOne } from "../../service/spaces.service";

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
    setModal(!modal)
  };

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Card style={{ margin: "10%", minWidth: "30%" }}>
        <Link key={space._id} to={`/spaces/${space._id}`}>
          <CardImg top width="100%" src={space.imgURL} alt="Card image cap" />
        </Link>
        <CardBody>
          <CardTitle tag="h5">{space.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {space.type}
          </CardSubtitle>
          <CardText>{space.description}</CardText>
          {edit ? (
            <>
              <Button
                style={{ margin: "5%", width: "30%" }}
                onClick={toggle}
                color="danger"
              >
                Delete
              </Button>
              <Button
                style={{ margin: "5%", width: "30%" }}
                onClick={redirect}
                color="info"
              >
                Edit
              </Button>
            </>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¡Oye! Vas a borrar el espacio</ModalHeader>
        <ModalBody>
          <p>
            Estás a punto de eliminar el espacio {space.name}.<br></br><br></br>
            ¿Confirmas que quieres borrarlo?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemove}>
            Sí, borrar espacio
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SpacesList;
