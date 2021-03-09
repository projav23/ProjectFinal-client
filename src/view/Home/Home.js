import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import "./home.css";

function Home() {
  const { user } = useAuth();
  const [isLogged, setLogged] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false)

  console.log("user", user);
  
  const handleInfo = () => {
    if (localStorage.getItem('user')) {
      setLogged(true);
      setRefresh(!refresh)
    } else {
      setLogged(false);
      setRefresh(!refresh)

    }
  };
  useEffect(() => {
    handleInfo();
    console.log("prueba useEffect");
  }, [refresh]);
  console.log(isLogged);
  return (
    <div className="home">
      <div className="title">
        {isLogged ? (
          <div>
            <Link to="spaces">
              <h2>Espacios</h2>
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link to="new">
              <h2>Crear espacio</h2>
            </Link>
          </div>
        ) : (
          <div>
            <h2>Haz de la convivencia algo mas sencillo</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Link to="login">
              <h2>Unete</h2>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
