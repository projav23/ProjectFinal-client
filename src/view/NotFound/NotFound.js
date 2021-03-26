import React from "react";
import { useHistory } from "react-router";
import "./NotFound.css"

const NotFound = ({ toggle }) => {
  let history = useHistory()

  const handleBack = () =>{
    history.goBack()
  }
  React.useEffect(() => {
    toggle();
  }, []);
  return (
    <div className="notFound">
      <div className="wrapper2">
        <h1>404.</h1>
        <p>
          It seems that you're lost in a perpetual black hole. Let us help guide
          you out and get you back home.
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

export default NotFound;
