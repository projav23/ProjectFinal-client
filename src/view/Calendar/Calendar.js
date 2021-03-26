import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";
import "./Calendar.css";
import {
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
import {
  allEvents,
  deleteEvent,
  newEvent,
} from "../../service/calendar.service";
import { findSpace } from "../../service/spaces.service";
import calendarImg from "./top-view-desk-2021-calendar.jpg";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const initialState = {
    title: "",
    end: "",
    start: "",
    allDay: null,
  };
  const { spaceId } = useParams();
  const [events, setEvents] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [modalEvent, setModalEvent] = React.useState(false);
  const [space, setSpace] = React.useState({});
  const [state, setState] = React.useState(initialState);
  const [eventoTemp, setEventoTemp] = React.useState(
    { start: "", end: "", title: "", createdBy: {username:"default"} },
  );

  const toggleTemp = () => setModalEvent(!modalEvent);
  const toggle = () => setModal(!modal);

  const getName = async () => {
    const { data } = await findSpace(spaceId);

    setSpace(data);
  };
  React.useEffect(() => {
    getName();
  }, []);

  const getAllEvents = async () => {
    try {
      const { data } = await allEvents(spaceId);
      data.forEach((event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
      });


      setEvents(data);
    } catch (e) {

    }
  };

  React.useEffect(() => {
    getAllEvents();
  }, []);

  const onSelectEvent = async (pEvent) => {
    setEventoTemp(pEvent);

    toggleTemp();

  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });

  };

  const handleDelete = async () => {
    await deleteEvent(spaceId, eventoTemp._id);
    getAllEvents();
    setModalEvent(!modalEvent);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await newEvent(spaceId, state);
      getAllEvents();
      setModal(!modal);
      setState(initialState);
    } catch (e) {
    }
  };

  const style = {
    backgroundImage: `url(${calendarImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    filter: "grayscale(70%)",
  };

  return (
    <>
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
            Calendario
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="newEvent">
          <img onClick={toggle} src="/images/plus.png" alt="mas"></img>
        </div>
        <div style={style} className="title-logo"></div>
        <Calendar
          selectable
          onDoubleClickEvent={() => toggle()}
          onSelectEvent={(event) => onSelectEvent(event)}
          localizer={localizer}
          events={events}
          defaultView={"day"}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "orange",
            },
          })}
        />
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¿Qué quieres recordar?</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label> Titulo del evento:</Label>
              <Input name="title" type="text" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label> Fecha/hora de inicio:</Label>
              <Input
                name="start"
                type="datetime-local"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label> Fecha/hora de fin:</Label>
              <Input name="end" type="datetime-local" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label> ¿El evento tiene duración diaria?</Label>
              <Input name="allDay" onChange={handleChange} type="select">
              <option selected="true" disabled="disabled">
                Selecciona una opcion
              </option>
              <option value="true">Si</option>
              <option value="false">No</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "orange", border: "none" }}
          >
            Crear evento
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEvent} centered="true" toggle={toggleTemp}>
        <ModalHeader toggle={toggleTemp}>Información del evento</ModalHeader>
        <ModalBody>
          <p>
            <strong>Nombre del evento:</strong> {eventoTemp.title}
          </p>
    
          <p>{eventoTemp.createdBy.username}</p>
          <p></p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDelete} color="danger">
            Borrar evento
          </Button>
          <Button color="secondary" onClick={toggleTemp}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MyCalendar;

