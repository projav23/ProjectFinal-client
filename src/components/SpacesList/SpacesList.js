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
import "./SpaceList.css";

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
  console.log('user.user', user.user)
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className='fadeout'>
      <div className="container1">
        <div className="card1">
        
          <div className="card__image-container1">
          <Link key={space._id} to={`/spaces/${space._id}`}>
          <CardImg
            className="imagenEspacio"
            src={space.imgURL}
            alt="Card image cap"
          />
          
            <svg class="card__svg1" viewBox="0 0 800 500">
              <path
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                stroke="transparent"
                fill="#343c44"
              />
              <path
                class="card__line1"
                d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                stroke="pink"
                stroke-width="3"
                fill="transparent"
              />
            </svg>
            </Link>
          </div>
          <div className="card__content1">
            <h1 className="card__title1">{space.name}</h1>
            <p>
              {space.description}
            </p>
      
            {edit ? (
            <div
              style={{
                margin: "25%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <FiTrash2 size={24} onClick={toggle} color={"white"}></FiTrash2>
              <FiSettings
                size={24}
                onClick={redirect}
                color={"white"}
              ></FiSettings>
            </div>
          ) : (
            <></>
          )}
          </div>
        </div>
      </div>
      {/* <Card
        style={{ margin: "10%", minWidth: "30%", backgroundColor: "#ffffffeb" }}
      >
        <Link key={space._id} to={`/spaces/${space._id}`}>
          <CardImg
            className="imagenEspacio"
            src={space.imgURL}
            alt="Card image cap"
          />
        </Link>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
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
      </Card> */}
      <Modal isOpen={modal} centered={true} toggle={toggle}>
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
    </div>
  );
};

export default SpacesList;
