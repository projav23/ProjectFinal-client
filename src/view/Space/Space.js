import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpaceCard from "../../components/SpaceCard/SpaceCard";
import { findSpace } from "../../service/spaces.service";
import "./Space.css";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import Spinner from "../../components/Spinner/Spinner";

function Space() {
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({});

 

  const getSpace = async () => {
    const { data } = await findSpace(spaceId);
 
    setState(data);
    setLoading(true);
  
  };
  useEffect(() => {
    getSpace();
  }, []);




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
        <Spinner/>
      )}
    </div>
  );
}

export default Space;
