import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SpaceCard from "../../components/SpaceCard/SpaceCard";
import { findSpace } from "../../service/spaces.service";
import "./Space.css";


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
    backgroundImage: `url(${state.imgURL})`,
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
  };

  return (
    <div style={style} className="space-view">


      {loading ? (
        <SpaceCard state={state} spaceId={spaceId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Space;
