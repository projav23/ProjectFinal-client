import React from "react";
import { allSpaces } from "../../service/spaces.service";
import SearchBar from "../../components/SearchBar/SearchBar"
import SpaceList from "../../components/SpacesList/SpacesList";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function Spaces() {
  const [spaces, setSpaces] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState([]);


  const getSpaces = async () => {
    const { data } = await allSpaces();
    setSpaces(data);
    setSearch(data)
    setLoading(true);
  };

  React.useEffect(() => {
    getSpaces();
  }, []);

  const filterSpace = (value) => {
    if (value !== ""){
      const spacefilter = spaces.filter(space => (space.name.toLowerCase().includes(value.toLowerCase())))
      setSearch(spacefilter)
      console.log("spacefilter", spacefilter)
    } else {
      setSearch([...spaces])
    }
  }

  return (
    <div style={{maxWidth:'900px', display:'flex', flexDirection:'column', margin:'auto'}}>
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" href="/">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem active tag="a" href="#">
            Spaces
          </BreadcrumbItem>
        </Breadcrumb>
        <SearchBar filter={filterSpace}/>
      </div>
      <div style={{display:'flex', flexWrap:'wrap'}}>
      {loading ? (
        search.map((space) => (
            <SpaceList space={space}></SpaceList>
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
}

export default Spaces;
