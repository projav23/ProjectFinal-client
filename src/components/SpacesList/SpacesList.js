import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext.utils";
import { deleteSpaceOne } from "../../service/spaces.service";

const SpacesList = ({ space, onDelete }) => {
  let history = useHistory();
  const redirect = () => {
    history.push(`/spaces/${space._id}/edit`);
  };

  const handleRemove = () => {
    onDelete(space._id);
  };
  
  return (
 
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
        <Button
          style={{ margin: "5%", width: "30%" }}
          onClick={handleRemove}
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
      </CardBody>
    </Card>
  );
};

export default SpacesList;
