import React from "react";

function TaskList({ task, onClick }) {
  const [status, setStatus] = React.useState(false);

  const handleClick = () => {
    setStatus(!status);
  };
  return (
    <>
      <label style={status ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}><input type="checkbox" onClick={handleClick} ></input>{task.name}</label>
    </>
  );
}

export default TaskList