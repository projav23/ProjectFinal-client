import React, { useEffect } from "react";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import {
  allShoppingList,
  deleteItem,
  newItemList,
} from "../../service/shopping.service";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { findSpace } from "../../service/spaces.service";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import { IoArrowBackCircle } from "react-icons/io5";
import itemImg from "./woman-with-shopping-cart-buying-food-at-supermarket.jpg";

const GetAllItems = (props) => {
  const initialState = {
    name: "",
    quantity: 0,
  };
  let history = useHistory();
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState(initialState);
  const [items, setItems] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleModal = () => setModal(!modal);

  const getItems = async () => {
    const { data } = await allShoppingList(spaceId);
    setItems(data);
    setLoading(true);
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    console.log(data);
    setSpace(data);
  };
  useEffect(() => {
    getItems();
  }, []);
  useEffect(() => {
    getName();
  }, []);

  const goBack = () => {
    history.push(`/spaces/${spaceId}`);
  };

  const handleDelete = async (shoppingId) => {
    try {
      const deleteOne = await deleteItem(spaceId, shoppingId);
      getItems();
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Vista");
      const createNewItem = await newItemList(spaceId, state);
      getItems();
      setState(initialState);
      if (createNewItem) {
        setModal(!modal);
      }
      console.log("tarea", createNewItem);
    } catch (e) {
      console.error(e);
    }
  };

  const style = {
    backgroundImage: `url(${itemImg})`,
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
        <BreadcrumbItem  tag="a" href="/spaces">
          Espacios
        </BreadcrumbItem>
        <BreadcrumbItem  tag="a" href={`/spaces/${spaceId}`}>
          {space.name}
        </BreadcrumbItem>
        <BreadcrumbItem active tag="a" href="#">
          Lista compra
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="newEvent">
        <img onClick={toggleModal} src="/images/mas.png" alt="mas"></img>
      </div>
      <div style={style} className="title-logo">
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
              Lista de la compra
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="column">
                  {loading ? (
                    items.allItems.map((item, idx) => (
                      <ShoppingList
                        onDelete={handleDelete}
                        key={item._id}
                        item={item}
                        idx={idx}
                      ></ShoppingList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué hay que comprar?</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                Producto:
                <Input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Cantidad a comprar:
                <Input
                  type="number"
                  name="quantity"
                  value={state.quantity}
                  onChange={handleChange}
                />
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} color="primary">
            Añadir a la lista
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GetAllItems;
