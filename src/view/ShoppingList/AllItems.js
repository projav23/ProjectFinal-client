import React, { useEffect } from "react";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import { allShoppingList, deleteItem } from "../../service/shopping.service";
import { findSpace } from "../../service/spaces.service";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
// import NewTask from "./NewTask";
// import "./AllTasks.css";
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

const GetAllItems = (props) => {
  let history = useHistory();
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  // const [modal, setModal] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [items, setItems] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
    history.push(`/spaces/${spaceId}`)
  };

  const handleDelete = async (shoppingId) =>{
    try {
    const deleteOne = await deleteItem(spaceId, shoppingId)
    getItems()
    } catch (e) {
    console.error(e)
    }
  }

  return (
    <div>
      <div className="title-logo">
        <img onClick={goBack} src="/images/left-arrow.png" alt="back"></img>
        <p className="space">{space.name}</p>
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
                    items.allItems.map((item) => (
                      <ShoppingList onDelete={handleDelete} key={item._id} item={item}></ShoppingList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link to={`/spaces/${spaceId}/shoppinglist/newshoppinglist`}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default GetAllItems;
