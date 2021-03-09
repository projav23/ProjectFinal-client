import React, { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { tasksAll } from "../../service/tasks.service";
import { findSpace } from "../../service/spaces.service";
import TaskList from "../../components/TaskList/TaskList";
import NewTask from './NewTask'
import "./AllTasks.css";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classnames from "classnames";

const GetAllTasks = (props) => {
  let history = useHistory();
  const { spaceId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [tasks, setTasks] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  const getTasks = async () => {
    const { data } = await tasksAll(spaceId);
    setTasks(data);
    setLoading(true);
  };
  const getName = async () => {
    const { data } = await findSpace(spaceId);
    console.log(data);
    setSpace(data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    getName();
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
                <div className="column">
                  {loading ? (
                    tasks.allTask.map((task) => (
                      <TaskList key={task._id} task={task}></TaskList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <img
                  onClick={toggleModal}
                  src="/images/mas.png"
                  alt="mas"
                ></img>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <div className="column">
                  {loading ? (
                    tasks.taskByUser.map((task) => (
                      <TaskList key={task._id} task={task}></TaskList>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <img
                  onClick={toggleModal}
                  src="/images/mas.png"
                  alt="mas"
                ></img>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Crear nueva tarea</ModalHeader>
          <ModalBody><NewTask/></ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Create
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default GetAllTasks;
