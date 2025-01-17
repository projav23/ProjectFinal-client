import React from "react";
import { useParams } from "react-router";
import ChoreList from "../../components/ChoreList/ChoreList";
import { choresAll, deleteChore, newChore } from "../../service/chores.service";
import choreImg from "./top-view-frame-with-contract-and-wooden-judge-gavel.jpg";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { findSpace } from "../../service/spaces.service";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

  Form,
  FormGroup,
  Label,
  Input,

} from "reactstrap";
import Spinner from "../../components/Spinner/Spinner";

const AllChores = () => {
  const initialState = { name: "", description: "" };
 
  const { spaceId } = useParams();
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState(initialState);
  const [chores, setChores] = React.useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [error, setError] = React.useState(false)

  const toggleModal = () => setModal(!modal);

  const getAllChores = async () => {
    const { data } = await choresAll(spaceId);

    setChores(data);
    setLoading(true);
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);

    setSpace(data);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  React.useEffect(() => {
    getAllChores();
  }, []);
  React.useEffect(() => {
    getName();
  }, []);



  const handleDelete = async (choreId) => {
    try {
      const {data} = await deleteChore(spaceId, choreId);
      if(data){
       getAllChores(); 
      }
    } catch (e) {
   
    }
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async () => {
    try {
      if(!state.name.length || !state.description.length){
        setError({message: "Debes completar los campos requeridos"})
      }else{
      const { data } = await newChore(spaceId, state);
      getAllChores();
      setState(initialState);
      if (data) {
        setModal(!modal);
      }
      }
    } catch (e) {
     
    }
  };

  const style = {
    backgroundImage: `url(${choreImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    filter: "grayscale(70%)",
  };

  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag="a" href="/">
          Home
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href="/spaces">
          Espacios
        </BreadcrumbItem>
        <BreadcrumbItem tag="a" href={`/spaces/${spaceId}`}>
          {space.name}
        </BreadcrumbItem>
        <BreadcrumbItem active tag="a" href="#">
          Normas
        </BreadcrumbItem>
      </Breadcrumb>
      <div style={style} className="title-logo">

      </div>
      <div className="newEvent">
        <img onClick={toggleModal} src="/images/plus.png" alt="mas"></img>
      </div>
      <div className="max-width900">
        <Nav tabs>
          <NavItem >
            <NavLink
              style={{ width: "375px", fontSize: "1.1em", fontFamily: "Lato" }}
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Normas del hogar
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="column-expenses">
                  {loading ? (
                    chores.map((item, idx) => (
                      <ChoreList
                        onDelete={handleDelete}
                        key={item._id}
                        idx={idx}
                        chore={item}
                      ></ChoreList>
                    ))
                  ) : (
                    <Spinner/>
                  )}
                </div>
        
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué quieres que se haga?</ModalHeader>
        <ModalBody>
          <Form className="form-space" onSubmit={handleSubmit} id="form">
            <FormGroup>
              <Label>Nombre de la norma:</Label>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Descripción detallada de la norma:</Label>
              <Input
                type="textarea"
                name="description"
                value={state.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Form>
          <p style={{color:"red"}}>{error.message}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} style={{ backgroundColor: "orange", border:'none' }}>
            Añadir norma
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AllChores;
