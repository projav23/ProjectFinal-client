import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";
import "./Calendar.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  allEvents,
  deleteEvent,
  newEvent,
} from "../../service/calendar.service";

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
  const [eventDate, setEventDate] = React.useState({start:"", end:"", title:""})

  const [state, setState] = React.useState(initialState);
  const [eventoTemp, setEventoTemp] = React.useState([{start:"", end:"", title:""}])

  const toggleTemp = () => setModalEvent(!modalEvent);
  const toggle = () => setModal(!modal);

  const getAllEvents = async () => {
    try {
      const { data } = await allEvents(spaceId);
       data.forEach((event) => {
        event.start = new Date(event.start)
        event.end = new Date(event.end)
      })
      // let str = event.start;
      // const year = Number(str.substring(0, 4));
      // let month = str.substring(5, 7);
      // let day = str.substring(8, 10);
      // let hour = str.substring(11, 13);
      // let minutes = str.substring(14, 16);
      // let monthNew;
      // let dayNew;
      // let hourNew;
      // let minutesNew;
      // const month1 = month.split("");

      // if (month1[0] === "0") {
      //   month1.splice(0, 1);
      //   monthNew = Number(month1.toString());
      // } else {
      //   monthNew = Number(month1.join(""));
      // }
      // const day1 = day.split("");
      // if (day1[0] === "0") {
      //   day1.splice(0, 1);
      //   dayNew = Number(day1.toString());
      // } else {
      //   dayNew = Number(day1.join(""));
      // }
      // const hour1 = hour.split("");
      // if (hour1[0] === "0") {
      //   hour1.splice(0, 1);
      //   hourNew = Number(hour1.toString());
      // } else {
      //   hourNew = Number(hour1.join(""));
      // }

      // const minutes1 = minutes.split("");
      // if (minutes1[0] === "0") {
      //   minutes1.splice(0, 1);
      //   minutesNew = Number(minutes1.toString());
      // } else {
      //   minutesNew = Number(minutes1.join(""));
      // }

      // let strEnd = event.end;
      // const yearEnd = Number(strEnd.substring(0, 4));
      // let monthEnd = strEnd.substring(5, 7);
      // let dayEnd = strEnd.substring(8, 10);
      // let hourEnd = strEnd.substring(11, 13);
      // let minutedEnd = strEnd.substring(14, 16);
      // let monthEndNew;
      // let dayEndNew;
      // let hourEndNew;
      // let minutedEndNew;
      // const monthEnd1 = monthEnd.split("");

      // if (monthEnd1[0] === "0") {
      //   monthEnd1.splice(0, 1);
      //   monthEndNew = Number(monthEnd1.toString());
      // } else {
      //   monthEndNew = Number(monthEnd1.join(""));
      // }
      // const dayEnd1 = dayEnd.split("");
      // if (dayEnd1[0] === "0") {
      //   dayEnd1.splice(0, 1);
      //   dayEndNew = Number(dayEnd1.toString());
      // } else {
      //   dayEndNew = Number(dayEnd1.join(""));
      // }
      // const hourEnd1 = hourEnd.split("");
      // if (hourEnd1[0] === "0") {
      //   hourEnd1.splice(0, 1);
      //   hourEndNew = Number(hourEnd1.toString());
      // } else {
      //   hourEndNew = Number(hourEnd1.join(""));
      // }

      // const minutedEnd1 = minutedEnd.split("");
      // if (minutedEnd1[0] === "0") {
      //   minutedEnd1.splice(0, 1);
      //   minutedEndNew = Number(minutedEnd1.toString());
      // } else {
      //   minutedEndNew = Number(minutedEnd1.join(""));
      // }
      // event.start = moment(event.start).toDate();
      // event.end = moment(event.year).toDate();
      // console.log("fecha start", event.start);
      // console.log("fecha end", event.end);
      // });
      console.log("data mutada", data);
      setEvents(data);
    } catch (e) {
      console.error(e);
    }
  };
  console.log("events", events);
  React.useEffect(() => {
    getAllEvents();
  }, []);

  const onSelectEvent = async (pEvent) => {
    setEventoTemp(pEvent)
    toggleTemp()

    console.log('pEvent', pEvent)
    // const r = window.confirm(`¿Estás seguro de que quieres borrar el evento ${pEvent.title}?`);
    // if (r === true) {
    //   await deleteEvent(spaceId, pEvent._id);
    //   getAllEvents();
    // }
  };

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
    console.log("state", state);
  };

  const handleDelete = async() =>{
    await deleteEvent(spaceId, eventoTemp._id)
    getAllEvents()
    setModalEvent(!modalEvent)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await newEvent(spaceId, state);
      getAllEvents();
      setModal(!modal);
      setState(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  // const handleSelect = async({ start, end }) => {
  //   const title = window.prompt("New Event name");
  //   if (title)
  //     setState({...state,
  //       events: [
  //         ...state.events,
  //         {
  //           start,
  //           end,
  //           title,
  //         },
  //       ],
  //     });
  //     const { data } = await newEvent(spaceId, state);
  //     getAllEvents();
  // };

  return (
    <>
      <div>
        <div className="newEvent">
          <img onClick={toggle} src="/images/mas.png" alt="mas"></img>
        </div>
        <Calendar
          selectable
          onDoubleClickEvent={() => toggle()}
          onSelectEvent={event => onSelectEvent(event)}
          localizer={localizer}
          events={events}
        />
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¿Qué quieres recordar?</ModalHeader>
        <ModalBody>
          <form>
            <label>
              Titulo del evento:
              <input name="title" type="text" onChange={handleChange} />
            </label>
            <label>
              Fecha inicio:
              <input name="start" type="datetime-local" onChange={handleChange} />
            </label>

            <label>
              Fecha fin:
              <input name="end" type="datetime-local" onChange={handleChange} />
            </label>
            <label>
              ¿El evento tiene duración diaria?
              <select name="allDay" onChange={handleChange}>
                <option selected="true" disabled="disabled">
                  Selecciona una opcion
                </option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} color="success">
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
          <p>{eventoTemp.title}</p>
          <p>{eventoTemp._id}</p>
          <p>{eventoTemp.createdBy}</p>
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

// import React from 'react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Eventcalendar, snackbar, setOptions, Popup, Button, Input, Textarea, Switch, Datepicker, SegmentedGroup, SegmentedItem, localeEs } from '@mobiscroll/react';

// setOptions({
//     locale: localeEs,
//     theme: 'ios',
//     themeVariant: 'light'
// });

// const now = new Date();
// const defaultEvents = [{
//     id: 1,
//     start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
//     end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
//     title: 'Lunch @ Butcher\'s',
//     color: '#26c57d'
// }, {
//     id: 2,
//     start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
//     end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
//     title: 'General orientation',
//     color: '#fd966a'
// }, {
//     id: 3,
//     start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18),
//     end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
//     title: 'Dexter BD',
//     color: '#37bbe4'
// }, {
//     id: 4,
//     start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30),
//     end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30),
//     title: 'Stakeholder mtg.',
//     color: '#d00f0f'
// }];

// const viewSettings = {
//     calendar: { labels: true }
// };
// const responsivePopup = {
//     medium: {
//         display: 'anchored',
//         width: 400,
//         fullScreen: false,
//         touchUi: false
//     }
// };

// function MyCalendar() {
//     const [myEvents, setMyEvents] = React.useState(defaultEvents);
//     const [tempEvent, setTempEvent] = React.useState(null);
//     const [isOpen, setOpen] = React.useState(false);
//     const [isEdit, setEdit] = React.useState(false);
//     const [anchor, setAnchor] = React.useState(null);
//     const [start, startRef] = React.useState(null);
//     const [end, endRef] = React.useState(null);
//     const [popupEventTitle, setTitle] = React.useState('');
//     const [popupEventDescription, setDescription] = React.useState('');
//     const [popupEventAllDay, setAllDay] = React.useState(true);
//     const [popupEventDate, setDate] = React.useState([]);
//     const [popupEventStatus, setStatus] = React.useState('busy');
//     const [mySelectedDate, setSelectedDate] = React.useState(now);

//     const saveEvent = React.useCallback(() => {
//         const newEvent = {
//             id: tempEvent.id,
//             title: popupEventTitle,
//             description: popupEventDescription,
//             start: popupEventDate[0],
//             end: popupEventDate[1],
//             allDay: popupEventAllDay,
//             status: popupEventStatus,
//             color: tempEvent.color
//         };
//         if (isEdit) {
//             // update the event in the list
//             const index = myEvents.findIndex(x => x.id === tempEvent.id);;
//             const newEventList = [...myEvents];

//             newEventList.splice(index, 1, newEvent);
//             setMyEvents(newEventList);
//             // here you can update the event in your storage as well
//             // ...
//         } else {
//             // add the new event to the list
//             setMyEvents([...myEvents, newEvent]);
//             // here you can add the event to your storage as well
//             // ...
//         }
//         setSelectedDate(popupEventDate[0]);
//         // close the popup
//         setOpen(false);
//     }, [isEdit, myEvents, popupEventAllDay, popupEventDate, popupEventDescription, popupEventStatus, popupEventTitle, tempEvent]);

//     const deleteEvent = React.useCallback((event) => {
//         setMyEvents(myEvents.filter(item => item.id !== event.id));
//         setTimeout(() => {
//             snackbar({
//                 button: {
//                     action: () => {
//                         setMyEvents(prevEvents => [...prevEvents, event]);
//                     },
//                     text: 'Undo'
//                 },
//                 message: 'Event deleted'
//             });
//         });
//     }, [myEvents]);

//     const loadPopupForm = React.useCallback((event) => {
//         setTitle(event.title);
//         setDescription(event.description);
//         setDate([event.start, event.end]);
//         setAllDay(event.allDay || false);
//         setStatus(event.status || 'busy');
//     }, []);

//     // handle popup form changes

//     const titleChange = React.useCallback((ev) => {
//         setTitle(ev.target.value);
//     }, []);

//     const descriptionChange = React.useCallback((ev) => {
//         setDescription(ev.target.value);
//     }, []);

//     const allDayChange = React.useCallback((ev) => {
//         setAllDay(ev.target.checked);
//     }, []);

//     const dateChange = React.useCallback((args) => {
//         setDate(args.value);
//     }, []);

//     const statusChange = React.useCallback((ev) => {
//         setStatus(ev.target.value);
//     }, []);

//     const onDeleteClick = React.useCallback(() => {
//         deleteEvent(tempEvent);
//         setOpen(false);
//     }, [deleteEvent, tempEvent]);

//     // scheduler options

//     const onSelectedDateChange = React.useCallback((event) => {
//         setSelectedDate(event.date);
//     });

//     const onEventClick = React.useCallback((args) => {
//         setEdit(true);
//         setTempEvent({ ...args.event });
//         // fill popup form with event data
//         loadPopupForm(args.event);
//         setAnchor(args.domEvent.target);
//         setOpen(true);
//     }, [loadPopupForm]);

//     const onEventCreated = React.useCallback((args) => {
//         // createNewEvent(args.event, args.target)
//         setEdit(false);
//         setTempEvent(args.event)
//         // fill popup form with event data
//         loadPopupForm(args.event);
//         setAnchor(args.target);
//         // open the popup
//         setOpen(true);
//     }, [loadPopupForm]);

//     const onEventDeleted = React.useCallback((args) => {
//         deleteEvent(args.event)
//     }, [deleteEvent]);

//     const onEventUpdated = React.useCallback((args) => {
//         // here you can update the event in your storage as well, after drag & drop or resize
//         // ...
//     }, []);

//     // datepicker options
//     const controls = React.useMemo(() => popupEventAllDay ? ['date'] : ['datetime'], [popupEventAllDay]);
//     const respSetting = React.useMemo(() => popupEventAllDay ? {
//         medium: {
//             controls: ['calendar'],
//             touchUi: false
//         }
//     } : {
//             medium: {
//                 controls: ['calendar', 'time'],
//                 touchUi: false
//             }
//         }, [popupEventAllDay]);

//     // popup options
//     const headerText = React.useMemo(() => isEdit ? 'Edit event' : 'New Event', [isEdit]);
//     const popupButtons = React.useMemo(() => {
//         if (isEdit) {
//             return [
//                 'cancel',
//                 {
//                     handler: () => {
//                         saveEvent();
//                     },
//                     keyCode: 'enter',
//                     text: 'Save',
//                     cssClass: 'mbsc-popup-button-primary'
//                 }
//             ];
//         }
//         else {
//             return [
//                 'cancel',
//                 {
//                     handler: () => {
//                         saveEvent();
//                     },
//                     keyCode: 'enter',
//                     text: 'Add',
//                     cssClass: 'mbsc-popup-button-primary'
//                 }
//             ];
//         }
//     }, [isEdit, saveEvent]);

//     const onClose = React.useCallback(() => {
//         if (!isEdit) {
//             // refresh the list, if add popup was canceled, to remove the temporary event
//             setMyEvents([...myEvents]);
//         }
//         setOpen(false);
//     }, [isEdit, myEvents]);

//     return <div>
//         <Eventcalendar
//             view={viewSettings}
//             data={myEvents}
//             clickToCreate="double"
//             dragToCreate={true}
//             dragToMove={true}
//             dragToResize={true}
//             selectedDate={mySelectedDate}
//             onSelectedDateChange={onSelectedDateChange}
//             onEventClick={onEventClick}
//             onEventCreated={onEventCreated}
//             onEventDeleted={onEventDeleted}
//             onEventUpdated={onEventUpdated}
//         />
//         <Popup
//             display="bottom"
//             fullScreen={true}
//             contentPadding={false}
//             headerText={headerText}
//             anchor={anchor}
//             buttons={popupButtons}
//             isOpen={isOpen}
//             onClose={onClose}
//             responsive={responsivePopup}
//         >
//             <div className="mbsc-form-group">
//                 <Input label="Title" value={popupEventTitle} onChange={titleChange} />
//                 <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
//             </div>
//             <div className="mbsc-form-group">
//                 <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
//                 <Input ref={startRef} label="Starts" />
//                 <Input ref={endRef} label="Ends" />
//                 <Datepicker
//                     select="range"
//                     controls={controls}
//                     touchUi={true}
//                     startInput={start}
//                     endInput={end}
//                     showRangeLabels={false}
//                     responsive={respSetting}
//                     onChange={dateChange}
//                     value={popupEventDate}
//                 />
//                 <SegmentedGroup onChange={statusChange}>
//                     <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Show as busy</SegmentedItem>
//                     <SegmentedItem value="free" checked={popupEventStatus === 'free'}>Show as free</SegmentedItem>
//                 </SegmentedGroup>
//                 {isEdit ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null}
//             </div>
//         </Popup>
//     </div>
// }

// export default MyCalendar;
