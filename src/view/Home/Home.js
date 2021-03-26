import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import "./home.css";
import play from "./tocar-play.png";
function Home() {
  const { user } = useAuth();
let history = useHistory()

  console.log("user", user);
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
                  <button onClick={handleSpace} class="learn-more">
                    <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Mis espacios</span>
                  </button>
                  <button onClick={handleSpaceNew} class="learn-more">
                    <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Crear espacio</span>
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
                <a id="play-video" class="video-play-button" href="/spaces">
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
