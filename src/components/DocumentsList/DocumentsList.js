import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./DocumentsList.css";
import { HiDownload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFileJpg, AiOutlineFileExcel, AiOutlineFileWord, AiOutlineFilePdf  } from "react-icons/ai";

function DocumentsList({ item, onDelete }) {
  const tipo = {
    imagen: <AiOutlineFileJpg color={'black'} size={24}/>,
    word: <AiOutlineFileWord  color={'black'} size={24}/>,
    excel: <AiOutlineFileExcel color={'black'} size={24}/>,
    pdf: <AiOutlineFilePdf color={'black'} size={24}/>,
  };

  const handleDelete = () => {
    onDelete(item._id);
    setModal(!modal);
  };

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <div className="card-documents">
        <div className="columna">
        {tipo[item.type]}
          {/* <img
            style={{ width: "30px" }}
            src={tipo[item.type]}
            alt="archivo"
          ></img> */}
        </div>
        <div className="icono-documents">
          <p id="name-doc">{item.name}</p>
        </div>
        <div className="row-doc">
          <a href={item.urlFile} download target="_blank" rel="noreferrer">
            <HiDownload  />
          </a>
        </div>
        <div className="row-doc2">
          <MdDeleteForever onClick={toggle} />
        </div>
        {/* <div className="columna">
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
      </div> */}
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¡Oye! Vas a borrar el espacio</ModalHeader>
        <ModalBody>
          <p>
            Estás a punto de eliminar el documento {item.name}.<br></br>
            <br></br>
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
