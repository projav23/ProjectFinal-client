import React, { useEffect } from "react";
import { expensesAll } from "../../service/expenses.service";
import { findSpace } from "../../service/spaces.service";
import { useParams, useHistory, Link } from "react-router-dom";
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

const AllExpenses = () => {
  let history = useHistory();
  const [expenses, setExpenses] = React.useState({});
  const [space, setSpace] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const { spaceId } = useParams();

  const getExpenses = async () => {
    try {
      const { data } = await expensesAll(spaceId);
      console.log("expenses", data);
      setExpenses(data);
      setLoading(true);
    } catch (e) {
      console.error(e);
    }
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    console.log(data);
    setSpace(data);
  };
  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    getExpenses();
  }, []);
  const goBack = () => {
    history.goBack();
  };

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
              style={{ width: "187px" }}
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Recibos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ width: "187px" }}
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Otros gastos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="column">
                  {loading ? (
                    expenses.recibos.map((expense) => <p>{expense.name}</p>)
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link to={`/spaces/${spaceId}/expenses/newexpense`}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <div className="column">
                  {loading ? (
                    expenses.otros.map((expense) => <p>{expense.name}</p>)
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link to={`/spaces/${spaceId}/expenses/newexpense`}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        {/* <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Crear nueva tarea</ModalHeader>
        <NewTask click={toggleModal}/>
       
          <Button form='taskForm' color="primary" onClick={toggleModal}>
            Create task
          </Button>{" "}
          <Button  color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        
      </Modal> */}
      </div>
    </div>
  );
};

export default AllExpenses;
