import React from "react";
import { useParams } from "react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./TaskList.css";
import { MdDeleteForever } from "react-icons/md";

function TaskList({ task, statusClick, onDelete }) {
  const { spaceId } = useParams();
  const handleClick = async () => {
    statusClick(spaceId, task._id);
  };
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const handleDelete = () => {
    onDelete(task._id);
  };

  const fecha = new Date(task.createdAt);
  const fechaEnd = new Date(task.endData);
  const fechaActual = new Date();
  const milidiasRestantes = fechaEnd - fechaActual;
  const diasRestantes = Math.floor(milidiasRestantes / 86400000);
  const milisegundos = fechaEnd - fecha;
  const dias = Math.floor(milisegundos / 86400000);
  const porcentajeDia = Number((100 / dias).toFixed(2));
  const porcentajeCompletado = ((dias - diasRestantes) * porcentajeDia).toFixed(
    0
  );

  return (
    <>
      <label id="label1" htmlFor={`task-${task._id}`}>
        <input
          className='input-display'
          type="checkbox"
          checked={task.status}
          onClick={handleClick}
          id={`task-${task._id}`}
        />
        <div className="card9">
          <div className="front">
            <p id="nombre">{task.name}</p>
            <p className="descripcion-task">{task.description}</p>
            <p id="asigned">Asigned to: {task.asignedTo.username}</p>
            <p className='progress-bar1'>
              <ProgressBar
                completed={porcentajeCompletado}
                diasRestantes={diasRestantes}
                bgColor='orange'
              />
            </p>
          </div>
          <div className="back2"><p style={{marginTop:'15%'}}>Completada</p><p className='flotar'><MdDeleteForever onClick={toggle}/></p></div>
        </div>
      </label>


      <Modal isOpen={modal} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          ¡Oye! Vas a borrar la tarea...
        </ModalHeader>
        <ModalBody>
          <p>
            Estás a punto de eliminar la tarea '{task.name}'.<br></br>
            <br></br>
            ¿Confirmas que quieres borrarla?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Sí, borrar tarea
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TaskList;
