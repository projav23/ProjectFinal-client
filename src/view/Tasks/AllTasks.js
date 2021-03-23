import React, { useEffect } from "react";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import {
  changeStatus,
  deleteTask,
  getUsersBySpace,
  newTask,
  tasksAll,
} from "../../service/tasks.service";
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
} from "reactstrap";
import classnames from "classnames";
import Pie from "../../components/ProgressCircleBar/ProgressCircleBar";

const GetAllTasks = (props) => {
  const initialState= {name:'', description:'', endData:'', asignedTo:''}
  let history = useHistory();
  const { spaceId } = useParams();
  const [state, setState] = React.useState(initialState)
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [tasks, setTasks] = React.useState({ allTask: [], tasksByUser: [] });
  const [activeTab, setActiveTab] = React.useState("1");
  const [count, setCount] = React.useState(0);

  const toggleModal = () => setModal(!modal);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getUsersAll = async () => {
    try {
      const { data } = await getUsersBySpace(spaceId);
      console.log("users", data);
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
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
    console.log('useEffect')
  }, []);
  useEffect(() => {
    getName();
  }, []);

  const goBack = () => {
    history.push(`/spaces/${spaceId}`);
  };

  const handleStatus = async (spaceId, taskId) => {
    const { data } = await changeStatus(spaceId, taskId);
    console.log("data task", data);
    getTasks();
  };

  const handleDelete = async (taskId) => {
    const { data } = await deleteTask(spaceId, taskId);
    getTasks();
  };

  const totalTask = tasks.allTask.length;
  const completedTask = tasks.allTask.filter(task => task.status).length
  const percentajetotal = (completedTask/totalTask)*100

  console.log("count", count);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };


  const handleSubmit= async ()=>{
    try {
    const createNewTask = await newTask(spaceId, state)
    getTasks()
    setState(initialState)
    if (createNewTask){
      setModal(!modal)
    }
    } catch (e) {
    console.error(e)
    }
  }



  return (
    <div>
      <div  className="title-logo">
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
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Pie percentage={percentajetotal} colour="blue" />
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
                    <p>Loading...</p>
                  )}
                </div>
                <Link onClick={toggleModal}>
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
                    tasks.taskByUser.map((task) => (
                      <TaskList
                        onDelete={handleDelete}
                        key={task._id}
                        task={task}
                        statusClick={handleStatus}
                      ></TaskList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <Link onClick={toggleModal}>
                  {" "}
                  <img src="/images/mas.png" alt="mas"></img>
                </Link>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
 
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>¿Qué quieres recordar?</ModalHeader>
        <ModalBody>
        <form onSubmit={handleSubmit}>
        <label>
          Nombre de la tarea
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripcion de la tarea
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Usuario asignado
          <select type="text" name="asignedTo"  onChange={handleChange}>
          <option selected='true' disabled='disabled'>Seleccionar usuario</option>
          {
            users.map((user)=>(
              <option value={user._id}>{user.username}</option>
            ))
          }
          </select>
        </label>
        <label>Fecha de fin 
          <input type='date' name='endData' value={state.endData} onChange={handleChange}/>
        </label>
        
      </form>
      
        </ModalBody>
        <ModalFooter>
          <Button  onClick={handleSubmit} color="success">
            Añadir gasto
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
