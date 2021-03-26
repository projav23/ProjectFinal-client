import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { findSpace, editSpace } from "../../service/spaces.service";
import EditSpaceForm from "../../components/EditSpaceForm/EditSpaceForm";
import {Breadcrumb ,BreadcrumbItem} from "reactstrap"

const EditSpace = () => {
  const [state, setState] = React.useState({
    name: "",
    users: [],
    description: "",
  });
  const { spaceId } = useParams();
  const [redirect, setRedirect] = React.useState(false);

  const getSpace = async () => {
    try {
      const { data } = await findSpace(spaceId);
      setState(data);
    } catch (e) {
    
    }
  };
  useEffect(() => {
    getSpace();
  }, []);

  const handleSubmit = async (space) => {
    try {
      const {data} = await editSpace(spaceId, space);
      if(data){
        setRedirect(true);
      }
    } catch (e) {}
  };


  return (
    <>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="a" href="/">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href="/spaces">
          Espacios
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href={`/spaces/${spaceId}`}>
          {state.name}
        </BreadcrumbItem>
        <BreadcrumbItem active tag="a" href="#">
          Editar Espacio
        </BreadcrumbItem>
      </Breadcrumb>
      <EditSpaceForm onSubmit={handleSubmit} isRedirect={redirect} />{" "}
    </>
  );
};

export default EditSpace;
