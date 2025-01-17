import React from "react";
import { allSpaces, deleteSpaceOne } from "../../service/spaces.service";
import SearchBar from "../../components/SearchBar/SearchBar";
import SpaceList from "../../components/SpacesList/SpacesList";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./Spaces.css";
import Spinner from "../../components/Spinner/Spinner";

function Spaces() {
  const [spaces, setSpaces] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState([]);

  const getSpaces = async () => {
    try {
      const { data } = await allSpaces();
      setSpaces(data);
      setSearch(data);
      setLoading(true);
    } catch (e) {}
  };

  React.useEffect(() => {
    getSpaces();
  }, []);

  const filterSpace = (value) => {
    if (value !== "") {
      const spacefilter = spaces.filter((space) =>
        space.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearch(spacefilter);
    } else {
      setSearch([...spaces]);
    }
  };
  const deleteSpace = async (spaceId) => {
    const { data } = await deleteSpaceOne(spaceId);
    if (data) {
      getSpaces();
    }
  };

  return (
    <div className="spaces-list">
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="/">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem active tag="a" href="#">
            Spaces
          </BreadcrumbItem>
        </Breadcrumb>
        <SearchBar filter={filterSpace} />
      </div>
      <div className="position-cards">
        {loading ? (
          search.map((space) => (
            <SpaceList
              key={space._id}
              onDelete={deleteSpace}
              space={space}
            ></SpaceList>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Spaces;
