import React, { useEffect } from "react";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import {
  changeStatus,
  deleteTask,
  tasksAll,
} from "../../service/tasks.service";
import { findSpace } from "../../service/spaces.service";
import TaskList from "../../components/TaskList/TaskList";
// import NewTask from "./NewTask";
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
  let history = useHistory();
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  // const [modal, setModal] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [tasks, setTasks] = React.useState({ allTask: [], tasksByUser: [] });
  const [activeTab, setActiveTab] = React.useState("1");
  const [count, setCount] = React.useState(0);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // const toggleModal = () => {
  //   setModal(!modal);
  // };
  // const redirectNewTask = () => {
  //   <Redirect to="/newtask" />;
  // };
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
    tasks.allTask.forEach((task) => {
      console.log('forEach task',  task)
      if (task.status) {
        setCount(count + 1);
      }else if (count > 0 && !task.status){
        setCount(count - 1)
      }
        
    });
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

  const numberTasks = tasks.allTask.length;
  const taskPercentaje = 100 / numberTasks;
  const percentajetotal = count * taskPercentaje;
  // console.log('numberTasks', numberTasks)

  // const percentaje = () => {
  //   setCount(0);
  //   tasks.allTask.forEach((task, idx) => {
  //     console.log("task.status", task.status);
  //     if (task.status) {
  //       setCount(count + 1);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   percentaje();
  // }, [tasks]);
  console.log("count", count);

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
                <Link to={`/spaces/${spaceId}/task/newtask`}>
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
                <Link to={`/spaces/${spaceId}/task/newtask`}>
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

export default GetAllTasks;
