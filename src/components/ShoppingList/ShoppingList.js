import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


function ShoppingList({ item, onDelete }) {
  const [status, setStatus] = React.useState(false);

  const handleClick = () => {
    setStatus(!status);
  };
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleRemove = () =>{
    onDelete(item._id)
    setModal(!modal)
  }
  return (
    <>
      <div>
        <label
          style={
            status
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          <input type="checkbox" onClick={handleClick}></input>
          {item.name}
        </label>
        <button onClick={toggle}>Borrar</button>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¡Oye! Vas a borrar el espacio</ModalHeader>
        <ModalBody>
          <p>
            Estás a punto de eliminar el documento {item.name}.<br></br><br></br>
            ¿Confirmas que quieres borrarlo?
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
  );
}

export default ShoppingList;
