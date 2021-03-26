import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import "./home.css";

function Home() {
  const { user } = useAuth();
let history = useHistory()


  const handleSpace = () =>{
    setTimeout(() => {
      history.push('/spaces')
    }, 1000);
  }
  const handleSpaceNew = () =>{
    setTimeout(() => {
      history.push('/new')
    }, 1000);
  }


  return (
    <>
      {user && user.isLogged ? (
        <>
          <div className="homeColor">
            <div className="title-home">
              <div id="container">
                  <button onClick={handleSpace} className="learn-more">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Mis espacios</span>
                  </button>
                  <button onClick={handleSpaceNew} className="learn-more">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Crear espacio</span>
                  </button>

              </div>

            </div>
          </div>
        </>
      ) : (
        <>
          <div className="home">
            <div className="title-home">
              <div className="lema">
                <h2>Make it easy with Roomies</h2>
              </div>
              <div className="unete">
                <a id="play-video" className="video-play-button" href="/spaces">
                  <span></span>
                </a>


              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
