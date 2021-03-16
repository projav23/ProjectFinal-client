import React from "react";
import "./SpaceCard.css";
import { Link } from "react-router-dom";

function SpaceCard({ state }) {
  return (
    <>
      
      <div className="iconos-row">
        <div className="iconos-column">
          <Link to={`/spaces/${state._id}/expenses`}>
            <img src="/images/costoso.png" alt="gastos"></img>
          </Link>
          <Link to={`/spaces/${state._id}/calendar`}>
            <img src="/images/calendario.png" alt="calendar"></img>
          </Link>
          <Link to={`/spaces/${state._id}/shoppingList`}>
            <img src="/images/dieta.png" alt="lista"></img>
          </Link>
        </div>
        <div className="iconos-column">
          <Link to={`/spaces/${state._id}/documents`}>
            <img src="/images/documentos-oficiales.png" alt="documents"></img>
          </Link>
          <Link to={`/spaces/${state._id}/task`}>
            <img src="/images/portapapeles.png" alt="tareas"></img>
          </Link>
          <Link to={`/spaces/${state._id}/chores`}>
            <img src="/images/regulacion.png" alt="reglas"></img>
          </Link>
        </div>
      </div>
    </>
  );
}
export default SpaceCard;
