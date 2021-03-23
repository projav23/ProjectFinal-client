import React from "react";
import { useParams } from "react-router";
import { Link, useHistory, Redirect } from "react-router-dom";
import ChoreList from "../../components/ChoreList/ChoreList";
import { choresAll, deleteChore, newChore } from "../../service/chores.service";
import choreImg from './top-view-frame-with-contract-and-wooden-judge-gavel.jpg'
import {IoArrowBackCircle} from 'react-icons/io5'
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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const AllChores = () => {
  const initialState = { name: "", description:'' }
  let history = useHistory();
  const { spaceId } = useParams();
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState(initialState);
  const [chores, setChores] = React.useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const toggleModal = () => setModal(!modal);


  const getAllChores = async () => {
    const { data } = await choresAll(spaceId);
    console.log(data);
    setChores(data);
    setLoading(true)
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    console.log(data);
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

  const goBack = () => {
    history.push(`/spaces/${spaceId}`)
  };

  const handleDelete =async (choreId) =>{
    try {
    const deleteOne = await deleteChore(spaceId, choreId)
    getAllChores()
    } catch (e) {
    console.error(e)
    }
  }

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit= async ()=>{
    try {
    const {data} = await newChore(spaceId, state)
    getAllChores()
    setState(initialState)
    if (data){
      setModal(!modal)
    }
    } catch (e) {
    console.error(e)
    }
  }

  const style = {
    backgroundImage: `url(${choreImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    filter: 'grayscale(70%)'
  };

  return (
<div>
      <div style={style} className="title-logo">
      <div className="back">
          <a href="/spaces/">
            <IoArrowBackCircle color={'white'} size={32} />
          </a>
        </div>        <p className="space">{space.name}</p>
      </div>
      <div className="newEvent">
          <img onClick={toggleModal} src="/images/mas.png" alt="mas"></img>
        </div>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ width: "375px" }}
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
                    chores.map((item,idx) => (
                      <ChoreList onDelete={handleDelete} key={item._id} idx={idx} chore={item} ></ChoreList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                {/* <Link onClick={toggleModal}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link> */}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué quieres recordar?</ModalHeader>
        <ModalBody>
        <form className="form-space" onSubmit={handleSubmit} id="form">
        <label>
          Nombre de la norma*
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripcion de la norma*
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
            required
          />
        </label>

      </form>
      
        </ModalBody>
        <ModalFooter>
          <Button  onClick={handleSubmit} color="success">
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
