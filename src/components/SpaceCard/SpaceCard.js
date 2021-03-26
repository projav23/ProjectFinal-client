import React from "react";
import "./SpaceCard.css";
import {GoKey, GoCalendar, GoFile, GoTasklist, GoCreditCard} from 'react-icons/go'
import {FiShoppingCart, FiShieldOff} from 'react-icons/fi'


function SpaceCard({ spaceId }) {
  return (
    <div className='drop-blur'>
      <nav className="menu">
        <input
          type="checkbox"
          href="#"
          className="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label className="menu-open-button" htmlFor="menu-open">
        <GoKey id="llave-icon" size={24}/>
        </label>

        <a href={`/spaces/${spaceId}/calendar`} className="menu-item">
          {" "}
          <GoCalendar className="prueba-icon" size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/documents`} className="menu-item">
          {" "}
          <GoFile className="prueba-icon" size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/task`} className="menu-item">
          {" "}
          <GoTasklist className="prueba-icon" size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/shoppingList`} className="menu-item">
          {" "}
          <FiShoppingCart className="prueba-icon" size={32}/>
        </a>
        <a href={`/spaces/${spaceId}/chores`} className="menu-item">
          {" "}
          <FiShieldOff className="prueba-icon" size ={32}/>
        </a>
        <a href={`/spaces/${spaceId}/expenses`} className="menu-item">
          {" "}
          <GoCreditCard className="prueba-icon" size={32}/>
        </a>
      </nav>
    </div>
  );
}
export default SpaceCard;
