import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  changeStatus,
  deleteTask,
  getUsersBySpace,
  newTask,
  tasksAll,
} from "../../service/tasks.service";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { findSpace } from "../../service/spaces.service";
import TaskList from "../../components/TaskList/TaskList";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./AllTasks.css";
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
import Pie from "../../components/ProgressCircleBar/ProgressCircleBar";
import taskImg from "./frustrated-tired-housewife-fed-up-with-home-routine-and-domestic-work-makes-suicide-gesture-shoots-at-temple-with-finger-stands-near-pile-of-laundry-hangs-wet-clean-clothes-on-clothesline.jpg";
import Spinner from "../../components/Spinner/Spinner";

const GetAllTasks = (props) => {
  const initialState = {
    name: "",
    description: "",
    endData: "",
    asignedTo: "",
  };

  const { spaceId } = useParams();
  const [state, setState] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [error, setError] = React.useState(false);
  const [tasks, setTasks] = React.useState({ allTask: [], taskByUser: [] });
  const [activeTab, setActiveTab] = React.useState("1");

  const toggleModal = () => setModal(!modal);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getUsersAll = async () => {
    try {
      const { data } = await getUsersBySpace(spaceId);

      setUsers(data);
    } catch (e) {}
  };
  React.useEffect(() => {
    getUsersAll();
  }, []);
  const getTasks = async () => {
    const { data } = await tasksAll(spaceId);
    setTasks(data);
    setLoading(true);
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    setSpace(data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    getName();
  }, []);

  const handleStatus = async (spaceId, taskId) => {
    const { data } = await changeStatus(spaceId, taskId);
    if (data) {
      getTasks();
    }
  };

  const handleDelete = async (taskId) => {
    const { data } = await deleteTask(spaceId, taskId);
    if (data) {
      getTasks();
    }
  };

  const totalTask = tasks.allTask.length;
  const totalTaskUser = tasks.taskByUser.length;
  const completedTask = tasks.allTask.filter((task) => task.status).length;
  const completedTaskUser = tasks.taskByUser.filter((task) => task.status)
    .length;
  const percentajetotal = (completedTask / totalTask) * 100;
  const percentajetotalUser = (completedTaskUser / totalTaskUser) * 100;

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!state.name || !state.asignedTo || !state.endData) {
        setError({ message: "Debes rellenar los campos obligatorios" });
      } else {
        const createNewTask = await newTask(spaceId, state);
        getTasks();
        setState(initialState);
        if (createNewTask) {
          setModal(!modal);
        }
      }
    } catch (e) {}
  };

  const style = {
    backgroundImage: `url(${taskImg})`,
    backgroundSize: "cover",
    backgroundPosition: "50% 30%",
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
          Tareas
        </BreadcrumbItem>
      </Breadcrumb>
      <div style={style} className="title-logo"></div>
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
              Tareas
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
              Mis tareas
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="max-width900" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              {tasks.allTask.length ? <Pie id="pie" percentage={percentajetotal} colour="orange" /> : null}
                <div className="column">
                  {loading ? (
                    tasks.allTask.map((task) => (
                      <TaskList
                        onDelete={handleDelete}
                        key={task._id}
                        task={task}
                        statusClick={handleStatus}
                      ></TaskList>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
                <div className="newEvent">
                  <img
                    onClick={toggleModal}
                    src="/images/plus.png"
                    alt="mas"
                  ></img>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              {tasks.taskByUser.length ? <Pie id="pie" percentage={percentajetotal} colour="orange" /> : null}
                <div className="column">
                  {loading ? (
                    tasks.taskByUser.map((task) => (
                      <TaskList
                        onDelete={handleDelete}
                        key={task._id}
                        task={task}
                        statusClick={handleStatus}
                      ></TaskList>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </div>
                <div className="newEvent">
                  <img
                    onClick={toggleModal}
                    src="/images/plus.png"
                    alt="mas"
                  ></img>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué quieres recordar?</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nombre de la tarea:</Label>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Descripcion de la tarea: (Opcional)</Label>
              <Input
                type="textarea"
                name="description"
                value={state.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Asignar a:</Label>
              <Input
                required
                type="select"
                name="asignedTo"
                onChange={handleChange}
              >
                <option selected="true" disabled="disabled">
                  Seleccionar usuario
                </option>
                {users.map((user) => (
                  <option value={user._id}>{user.username}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Fecha de fin</Label>
              <Input
                required
                type="date"
                name="endData"
                value={state.endData}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
          <p style={{color:"red"}}>{error.message}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "orange", border: "none" }}
          >
            Añadir tarea
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GetAllTasks;
