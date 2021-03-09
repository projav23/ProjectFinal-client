import React from "react";
import "./SpaceCard.css";
import { Link } from "react-router-dom";

function SpaceCard({ state }) {
  return (
    <>
      <div className="title">{state.name}</div>
      <div className="iconos-row">
        <div className="iconos-column">
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/costoso.png" alt="gastos"></img>
          </Link>
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/calendario.png" alt="gastos"></img>
          </Link>
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/dieta.png" alt="gastos"></img>
          </Link>
        </div>
        <div className="iconos-column">
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/documentos-oficiales.png" alt="gastos"></img>
          </Link>
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/portapapeles.png" alt="gastos"></img>
          </Link>
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/regulacion.png" alt="gastos"></img>
          </Link>
        </div>
      </div>
    </>
  );
}
export default SpaceCard;
