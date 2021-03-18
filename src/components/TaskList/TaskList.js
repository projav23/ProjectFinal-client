import React from "react";
import { useParams } from "react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProgressBar from "../ProgressBar/ProgressBar";

function TaskList({ task, statusClick, onDelete }) {
  const { spaceId } = useParams();
  const handleClick = async () => {
    statusClick(spaceId, task._id);
  };
  const [modal, setModal] = React.useState(false);
  const [color, setColor] = React.useState('#31D927')
  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    onDelete(task._id);
  };

  const fecha = new Date(task.createdAt)
  const fechaEnd = new Date(task.endData)
  const fechaActual = new Date()
  const milidiasRestantes = fechaEnd - fechaActual
  const diasRestantes = Math.floor(milidiasRestantes/86400000)
  const milisegundos = fechaEnd - fecha
  const dias = Math.floor(milisegundos/86400000)
  const porcentajeDia = Number((100/dias).toFixed(2))
  const porcentajeCompletado = ((dias - diasRestantes) * porcentajeDia).toFixed(0)
  const colorFunct = () =>{
    if(porcentajeCompletado >40 && porcentajeCompletado<=70){
    setColor('#F37A27')
  } else if(porcentajeCompletado >70 ){
    setColor('#F70909')
  } 
  }
  React.useEffect(()=>{
    colorFunct()
  },[])


  return (
    <>
      
      <div style={{ width:'150px',margin: "auto" }}>
      <ProgressBar completed={porcentajeCompletado} diasRestantes={diasRestantes} bgColor={color}/>
        <label
          style={
            task.status
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          <input
            type="checkbox"
            checked={task.status}
            onClick={handleClick}
          ></input>
          {task.name}
        </label>
        <button onClick={toggle}>Borrar</button>
      </div>

      <Modal isOpen={modal} centered="true" toggle={toggle}>
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
            Sí, borrar espacio
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
