import React from 'react'
import './ChoreList.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ChoreList = ({chore, onDelete}) => {

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleRemove = () =>{
    onDelete(chore._id)
    setModal(!modal)
  }
  return (
    <>
    <div className='chore'>
      <div className='center'>
        <p>{chore.name}</p> 
      </div>
      <div>
        <p>{chore.description}</p> 
        <button onClick={toggle}>Borrar</button>
      </div>
    </div>
    <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¡Oye! Vas a borrar la norma...</ModalHeader>
        <ModalBody>
          <p>
            Estás a punto de eliminar la norma '{chore.name}'.<br></br><br></br>
            ¿Confirmas que quieres borrarla?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemove}>
            Sí, borrar espacio
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ChoreList
