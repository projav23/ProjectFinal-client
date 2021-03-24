import React from "react";
import "./SpaceCard.css";
import {GoKey, GoCalendar, GoFile, GoTasklist, GoCreditCard} from 'react-icons/go'
import {FiShoppingCart, FiShieldOff} from 'react-icons/fi'
import {IoArrowBackCircle} from 'react-icons/io5'


function SpaceCard({ spaceId }) {
  return (
    <div className='drop-blur'>
      {/* <div className='back'><a href='/spaces/'><IoArrowBackCircle size={32}/></a></div> */}
      <nav className="menu">
        <input
          type="checkbox"
          href="#"
          className="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label className="menu-open-button" htmlFor="menu-open">
        <GoKey size={24}/>
          {/* <span className="hamburger hamburger-1"></span>
          <span className="hamburger hamburger-2"></span>
          <span className="hamburger hamburger-3"></span> */}
        </label>

        <a href={`/spaces/${spaceId}/calendar`} className="menu-item">
          {" "}
          <GoCalendar size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/documents`} className="menu-item">
          {" "}
          <GoFile size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/task`} className="menu-item">
          {" "}
          <GoTasklist size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/shoppingList`} className="menu-item">
          {" "}
          <FiShoppingCart size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/chores`} className="menu-item">
          {" "}
          <FiShieldOff size ={32}/>
        </a>
        <a href={`/spaces/${spaceId}/expenses`} className="menu-item">
          {" "}
          <GoCreditCard size={32}/>
        </a>
      </nav>
      {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feComposite in2="shadow" in="goo" result="goo" />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg> */}
      {/* <div classNameName="iconos-row">
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
      </div> */}
    </div>
  );
}
export default SpaceCard;
