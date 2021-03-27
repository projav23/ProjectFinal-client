import React from "react";
import { useHistory } from "react-router";
import "../../view/NotFound/NotFound.css"

const ErrorPage = () => {
  let history = useHistory()
  const handleBack = () =>{
    history.goBack()
  }

  return (
    <div className="notFound">
      <div className="wrapper2">
        <h1>Mmmm.</h1>
        <p>
        It seems something is not working right
        </p>
        <div className="buttons2">
          <button onClick={handleBack}>back</button>
          <a href="/">home</a>
          <br />
          <span>Help me out</span>
        </div>
      </div>

    </div>
  );
};

export default ErrorPage;
