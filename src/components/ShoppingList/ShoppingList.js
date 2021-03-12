import React from "react";

function ShoppingList({ item, onClick }) {
  const [status, setStatus] = React.useState(false);

  const handleClick = () => {
    setStatus(!status);
  };
  return (
    <>
      <label style={status ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}><input type="checkbox" onClick={handleClick} ></input>{item.name}</label>
    </>
  );
}

export default ShoppingList