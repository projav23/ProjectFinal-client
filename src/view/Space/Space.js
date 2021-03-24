import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SpaceCard from "../../components/SpaceCard/SpaceCard";
import { findSpace } from "../../service/spaces.service";
import "./Space.css";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function Space() {
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({});

  console.log("spaceId", spaceId);

  const getSpace = async () => {
    const { data } = await findSpace(spaceId);
    console.log("data", data);
    setState(data);
    setLoading(true);
    console.log(state);
  };
  useEffect(() => {
    getSpace();
  }, []);

  let history = useHistory();
  const redirect = () => {
    history.push("/spaces");
  };

  const style = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
  };

  return (
    <div style={style} className="space-view">
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="a" href="/">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem  tag="a" href="/spaces">
          Espacios
        </BreadcrumbItem>
        <BreadcrumbItem active tag="a" href="#">
          {state.name}
        </BreadcrumbItem>
      </Breadcrumb>

      {loading ? (
        <SpaceCard state={state} spaceId={spaceId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Space;
