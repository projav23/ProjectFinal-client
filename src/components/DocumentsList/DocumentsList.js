import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./DocumentsList.css";
import { HiDownload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFileJpg, AiOutlineFileExcel, AiOutlineFileWord, AiOutlineFilePdf  } from "react-icons/ai";

function DocumentsList({ item, onDelete }) {
  const tipo = {
    imagen: <AiOutlineFileJpg color={'black'} size={32}/>,
    word: <AiOutlineFileWord  color={'black'} size={32}/>,
    excel: <AiOutlineFileExcel color={'black'} size={32}/>,
    pdf: <AiOutlineFilePdf color={'black'} size={32}/>,
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
        </div>
        <div className="icono-documents">
          <p id="name-doc">{item.name}</p>
        </div>
        <div className="row-doc">
          <a href={item.urlFile} download target="_blank" rel="noreferrer">
            <HiDownload className="iconos-documentos" size={24} color={'orange'} />
          </a>
        </div>
        <div className="row-doc2">
          <MdDeleteForever className="iconos-documentos" size={22} onClick={toggle} />
        </div>

      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>¡Oye! Vas a borrar un documento</ModalHeader>
        <ModalBody>
          <p>
            Estás a punto de eliminar el documento '{item.name}'.<br></br>
            <br></br>
            ¿Confirmas que quieres borrarlo?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Sí, borrar documento
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DocumentsList;
