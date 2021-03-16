import React from "react";
import { Link } from "react-router-dom";

function DocumentsList({ item }) {
  const tipo = {
    imagen: '/images/formato-de-archivo-de-imagen-jpg.png',
    word: '/images/simbolo-de-formato-de-archivo-doc.png',
    excel: '/images/formato-de-archivo-xlsx.png',
    powerpoint: '/images/formato-de-archivo-ppt.png',
    csv: '/images/simbolo-de-formato-de-archivo-csv.png',
    pdf: '/images/simbolo-de-formato-de-archivo-pdf.png'
  }
  return (
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
    </div>
  );
}

export default DocumentsList;
