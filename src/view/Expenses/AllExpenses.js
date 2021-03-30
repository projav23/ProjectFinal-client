import React, { useEffect } from "react";
import {
  deleteExpense,
  expensesAll,
  newExpense,
} from "../../service/expenses.service";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { findSpace } from "../../service/spaces.service";
import ExpensesCard from "../../components/ExpensesCard/ExpensesCard";
import "./AllExpenses.css";
import { useParams } from "react-router-dom";
import expenseImg from "./entrepreneur-working-with-bills.jpg";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
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
import classnames from "classnames";
import Spinner from "../../components/Spinner/Spinner";

const AllExpenses = () => {
  const initialState = { name: "", description: "", type: "", price: "" };

  const [expenses, setExpenses] = React.useState({});
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("1");
  const [modal, setModal] = React.useState(false);
  const toggleModal = () => setModal(!modal);
  const [error, setError] = React.useState(false);
  const { spaceId } = useParams();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };
  const getExpenses = async () => {
    try {
      const { data } = await expensesAll(spaceId);

      setExpenses(data);
      setLoading(true);
    } catch (e) {}
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);

    setSpace(data);
  };
  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    getExpenses();
  }, []);

  const handleRemove = async (spaceId, expenseId) => {
    const { data } = await deleteExpense(spaceId, expenseId);
    if (data) {
      getExpenses();
    }
  };

  const fecha = new Date();
  const mes = fecha.getMonth() + 1;
  const year = fecha.getFullYear();

  const meses = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  const handleSubmit = async () => {
    try {
      if (!state.name.length || !state.price.length || !state.type.length) {
        setError({ messageRequired: "Debes rellenar los campos requeridos" });
      }else {
        const createNew = await newExpense(spaceId, state);
        getExpenses();
        setState(initialState);
  
        if (createNew) {
          setModal(!modal);
        }
      }

    } catch (e) {}
  };

  const style = {
    backgroundImage: `url(${expenseImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    filter: "grayscale(70%)",
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
          {space.name}
        </BreadcrumbItem>
        <BreadcrumbItem active tag="a" href="#">
          Gastos
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="newEvent">
        <span className="animation">
          <img onClick={toggleModal} src="/images/plus.png" alt="mas"></img>
        </span>
      </div>
      <div style={style} className="title-logo"></div>

      <div className="fecha">
        <span>{`${meses[mes]} de ${year}`}</span>
      </div>
      <div className="max-width900">
        <Nav tabs>
          <NavItem>
            <NavLink
              id="ancho"
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
              id="ancho"
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
                <div className="column-expenses">
                  {loading ? (
                    expenses.recibos.map((expense) => (
                      <ExpensesCard
                        key={expense._id}
                        expense={expense}
                        space={space}
                        deleteExp={handleRemove}
                      />
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <div className="column-expenses">
                  {loading ? (
                    expenses.otros.map((expense) => (
                      <ExpensesCard
                        key={expense._id}
                        expense={expense}
                        space={space}
                        deleteExp={handleRemove}
                      />
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué has gastado?</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit} id="form">
            <FormGroup>
              <Label>Nombre del gasto</Label>
              <Input
                required
                type="text"
                name="name"
                value={state.name}
                placeholder="Ej: Aquiler"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Descripción del gasto (Opcional)</Label>
              <Input
                type="textarea"
                name="description"
                value={state.description}
                placeholder="Ej: Es el pago mensual del aquiler"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>¿Cuanto ha costado?</Label>
              <Input
                required
                type="number"
                name="price"
                value={state.price}
                placeholder="Ej: 700"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>¿Qué tipo de gasto es?</Label>
              <Input
                required
                type="select"
                name="type"
                form="form"
                onChange={handleChange}
              >
                <option selected="true" disabled="disabled">
                  Selecciona una opcion
                </option>
                <option value="Recibos">Recibos</option>
                <option value="Otros">Otros gastos</option>
              </Input>
            </FormGroup>
          </Form>
          <p style={{color:"red"}}>{error.messageRequired}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "orange", border: "none" }}
          >
            Añadir gasto
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AllExpenses;
