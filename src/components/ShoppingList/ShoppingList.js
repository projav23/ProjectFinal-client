import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Shopping.css";
import { MdDeleteForever } from "react-icons/md";

function ShoppingList({ item, onDelete, idx }) {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleRemove = () => {
    onDelete(item._id);
    setModal(!modal);
  };

  return (
    <>
      <div className="card-items">
        <input className="check-item" id={`label-${idx}`} type="checkbox" />
        <label
          style={{ marginBottom: "0px" }}
          className="item-shop"
          htmlFor={`label-${idx}`}
        >
          <h2>
            {item.name}
            <span>Se necesita comprar {item.quantity}</span>
          </h2>
          <span onClick={toggle} className="delete-icon">
            <MdDeleteForever id="borrar-icon" size={18} />
          </span>
        </label>
      </div>
      <Modal isOpen={modal} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Estás a punto de eliminar '{item.name}' de la lista de la compra.
        </ModalHeader>
        <ModalBody>
          <p>¿Confirmas que quieres borrarlo?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemove}>
            Sí, borrar de la lista
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
