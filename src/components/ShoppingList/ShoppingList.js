import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Shopping.css";
import styled from 'styled-components'
import {MdDeleteForever} from 'react-icons/md'


function ShoppingList({ item, onDelete, idx }) {
  const [status, setStatus] = React.useState(false);

  const handleClick = () => {
    setStatus(!status);
  };
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleRemove = () => {
    onDelete(item._id);
    setModal(!modal);
  };

  // const InputItem = ({ item }) => (
  //   <>
  //     <input id={`label-${}`} type="checkbox" checked />
  //     <label for={`label-${item._id}`}>
  //       <h2>{item.name}</h2>
  //     </label>
  //   </>
  // );


  return (
    <>
      <div className="card-items">
  
        <input className='check-item' id={`label-${idx}`} type="checkbox" />
        <label style={{marginBottom:'0px'}} className='item-shop' htmlFor={`label-${idx}`}>
          <h2>
            {item.name}
            <span>Se necesita comprar {item.quantity}</span>
  
          </h2>
          <span onClick={toggle} className='delete-icon'>
           <MdDeleteForever   size={18}/> 
          </span>
          
        </label>
        {/* <label
          style={
            status
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          <input type="checkbox" onClick={handleClick}></input>
          {item.name}
        </label>
        <button onClick={toggle}>Borrar</button> */}
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>Estás a punto de eliminar '{item.name}' de la lista de la compra.</ModalHeader>
        <ModalBody>
          <p>
            ¿Confirmas que quieres borrarlo?
          </p>
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




