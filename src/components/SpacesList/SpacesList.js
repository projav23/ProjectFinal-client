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


const SpacesList = ({ space }) => {
  console.log("space", space)
  const { user } = useAuth();
  const [access, setAccess] = React.useState(true);
  let history = useHistory();
  const spaceId = space._id;
  const spaceUsers = space.users;
  console.log("spaceId", spaceId);
  console.log("array de usuarios", spaceUsers);

  console.log("user id login", user.user);
  const handleAccess = () => {
    if (spaceUsers.includes(user.user)) {
      console.log("debe entrar en el espacio");
      setAccess(true);
    }
  };
  React.useEffect(() => {
    handleAccess();
  }, []);
  const redirect = () => {
    history.push(`/spaces/${space._id}/edit`);
  };
  console.log("access", access);
  return (
    <>
      {access ? (
        <Card style={{ margin: "10%", minWidth: "30%" }}>
          <Link key={space._id} to={`/spaces/${space._id}`}>
            <CardImg
              top
              width="100%"
              src={space.imgURL}
              alt="Card image cap"
            />
          </Link>
          <CardBody>
            <CardTitle tag="h5">{space.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {space.type}
            </CardSubtitle>
            <CardText>{space.description}</CardText>
            <Button style={{ margin: "5%", width: "30%" }} color="danger">
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
      ) : (
        <Card style={{ margin: "10%", minWidth: "30%", backgroundColor:'grey' }}>
          <CardImg
            top
            width="100%"
            src="/images/helena-lopes-PGnqT0rXWLs-unsplash.jpg"
            alt="Card image cap"
          />

          <CardBody>
            <CardTitle tag="h5">{space.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {space.type}
            </CardSubtitle>
            <CardText>{space.description}</CardText>
            <Button style={{ margin: "5%", width: "30%" }} color="danger">
              Delete
            </Button>
            <Button
              style={{ margin: "5%", width: "30%" }}
              color="info"
            >
              Edit
            </Button>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SpacesList;
