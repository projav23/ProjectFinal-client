import React from "react";
import { useParams } from "react-router";
import { changeStatus } from "../../service/tasks.service";

function TaskList({ task, statusClick }) {
  const [status, setStatus] = React.useState(false);
  const { spaceId } = useParams();
  const handleClick = async () => {
    statusClick(spaceId, task._id)
     
  };
  return (
    <>
      <label
        style={
          task.status
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        <input type="checkbox" checked={task.status} onClick={handleClick}></input>
        {task.name}
      </label>
    </>
  );
}

export default TaskList;
