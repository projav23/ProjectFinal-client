
import React from "react";
import {allSpaces} from "../../service/spaces.service";
import { Link } from "react-router-dom";
import SpaceList from "../../components/SpacesList/SpacesList";

function Spaces() {
  const [spaces, setSpaces] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const getSpaces = async () => {
    let findSpace;
    if (!search) {
      findSpace = await allSpaces();
    } else {
      findSpace = await null;
    }
    const { data } = findSpace;
    setSpaces(data);
    setLoading(true);
  };

  React.useEffect(() => {
    getSpaces();
  }, []);
  return (
    <>
      {loading ? (
        spaces.map((space) => (
          <Link key={space._id} to={`/spaces/${space._id}`}>
            <SpaceList space={space}></SpaceList>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Spaces;
