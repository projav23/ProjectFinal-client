import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpaceCard from "../../components/SpaceCard/SpaceCard";
import { findSpace } from "../../service/spaces.service";

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

  return <>{loading ? <SpaceCard state={state} /> : <p>Loading...</p>}</>;
}

export default Space;
