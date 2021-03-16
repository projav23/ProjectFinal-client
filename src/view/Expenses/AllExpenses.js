import React, { useEffect } from "react";
import { deleteExpense, expensesAll } from "../../service/expenses.service";
import { findSpace } from "../../service/spaces.service";
import ExpensesCard from '../../components/ExpensesCard/ExpensesCard'
import './AllExpenses.css'
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
    history.push(`/spaces/${spaceId}/`);
  };

  const handleRemove = async (spaceId, expenseId) =>{
    const {data} = await deleteExpense(spaceId, expenseId)
    getExpenses()

  }

  const fecha = new Date()
  const dia = fecha.getDate()
  const mes = fecha.getMonth() + 1
  const year = fecha.getFullYear()

  const meses = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
  }
  // console.log('fecha', fecha)
  // console.log('dia', dia)
  // console.log('mes', mes)
  // console.log('year', year)


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
                <div className='fecha'><span>{`${meses[mes]} de ${year}`}</span></div>
                <div className="column-expenses">
                  {loading ? (
                    expenses.recibos.map((expense) => <ExpensesCard key={expense._id} expense={expense} space={space} deleteExp={handleRemove} />)
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
              <div className='fecha'><span>{`${meses[mes]} de ${year}`}</span></div>
                <div className="column-expenses">
                  {loading ? (
                    expenses.otros.map((expense) => 
                    <ExpensesCard expense={expense} space={space} deleteExp={handleRemove}/>)
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
