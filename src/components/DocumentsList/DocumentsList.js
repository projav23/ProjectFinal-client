import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function DocumentsList({ item, onDelete }) {
  const tipo = {
    imagen: '/images/formato-de-archivo-de-imagen-jpg.png',
    word: '/images/simbolo-de-formato-de-archivo-doc.png',
    excel: '/images/formato-de-archivo-xlsx.png',
    powerpoint: '/images/formato-de-archivo-ppt.png',
    csv: '/images/simbolo-de-formato-de-archivo-csv.png',
    pdf: '/images/simbolo-de-formato-de-archivo-pdf.png'
  }

  const handleDelete = () =>{
    onDelete(item._id)
    setModal(!modal)
  }

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
    <div className="card-expenses">
      <div className="columna">
        <span>{item.name}</span>
      </div>
      <div className='columna' style={{ fontSize:'0.7em', alignContent:'center'}}>
        <img style={{width:'40px'}} src={tipo[item.type]} alt='archivo'></img>
      </div>
      <div className='columna' style={{ fontSize:'0.7em'}}>
        <a href={item.urlFile} download target='_blank' rel='noreferrer'>Descargar</a>
      </div>
      <div className='columna' style={{ fontSize:'0.7em'}}>
        <button onClick={toggle}> Borrar</button>
      </div>
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
          <Button color="danger" onClick={handleDelete}>
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

export default DocumentsList;
