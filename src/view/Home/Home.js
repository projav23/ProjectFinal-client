import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import "./home.css";
import play from "./tocar-play.png";
function Home() {
  const { user } = useAuth();
  // const [isLogged, setLogged] = React.useState(null);
  // const [refresh, setRefresh] = React.useState(false);

  console.log("user", user);

  // const handleInfo = () => {
  //   if (localStorage.getItem("user")) {
  //     setLogged(true);
  //     setRefresh(!refresh);
  //   } else {
  //     setLogged(false);
  //     setRefresh(!refresh);
  //   }
  // };
  // useEffect(() => {
  //   handleInfo();
  //   console.log("prueba useEffect");
  // }, []);

  return (
    <>
      {user && user.isLogged ? (
        <>
          <div className="homeColor">
            <div className="title-home">
              <div className="mySpace">
                <Link to="spaces">
                  <img
                    className="casa"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Y2lyY2xlIHI9IjEyIiBjeD0iMTIiIGN5PSIxMiIgZmlsbD0iIzM0M2M0NCIgc2hhcGU9ImNpcmNsZSIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDApIj48L2NpcmNsZT48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjcsMCwwLDAuNywzLjYwMDAwMDAwMDAwMDAwODUsMy42MDAxMTI0OTE4NDYwODY3KSI+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNS4yNSAxOS4yNWMtLjgyNyAwLTEuNS0uNjczLTEuNS0xLjV2LTdoLTIuNWMtLjI3NiAwLS41LS4yMjUtLjUtLjUgMC0uMTM3LjA1OS0uMjY5LjE2LS4zNmw5LjU5LTkuMTQgMy43NSAzLjU2OXYtMi41NjloM3Y1LjQzbDIuODQgMi43MWMuMTA0LjA5NS4xNi4yMjguMTYuMzYgMCAuMjc1LS4yMjQuNS0uNS41aC0yLjV2N2MwIC44MjctLjY3MyAxLjUtMS41IDEuNXoiIGZpbGw9IiMzNDNjNDQiIGRhdGEtb3JpZ2luYWw9IiNjZmQ4ZGMiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0xNy41IDIzLjI1Yy0yLjEzNy0xLjU5LTUuNzUtNC45NTctNS43NS03LjUxMiAwLTEuNjQ3IDEuMzQ2LTIuOTg4IDMtMi45ODguODM0IDAgMS42MzcuMzQ4IDIuMjAxLjk1NGwuNTQ5LjU5LjU0OS0uNTljLjU2NC0uNjA2IDEuMzY3LS45NTQgMi4yMDEtLjk1NCAxLjY1NCAwIDMgMS4zNDEgMyAyLjk4OCAwIDIuNTU2LTMuNjE0IDUuOTI0LTUuNzUgNy41MTJ6IiBmaWxsPSIjMzQzYzQ0IiBkYXRhLW9yaWdpbmFsPSIjZjQ0MzM2IiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtMTcuNSAyNGMtLjE1NyAwLS4zMTQtLjA1LS40NDctLjE0OC0uNjItLjQ2LTYuMDUzLTQuNjAxLTYuMDUzLTguMTE0IDAtMi4wNjEgMS42ODItMy43MzggMy43NS0zLjczOCAxLjA2MyAwIDIuMDU0LjQ0NiAyLjc1IDEuMTk0LjY5Ni0uNzQ4IDEuNjg3LTEuMTk0IDIuNzUtMS4xOTQgMi4wNjggMCAzLjc1IDEuNjc3IDMuNzUgMy43MzggMCAzLjUxMy01LjQzMyA3LjY1My02LjA1MyA4LjExMy0uMTMzLjA5OS0uMjkuMTQ5LS40NDcuMTQ5em0tMi43NS0xMC41Yy0xLjI0MSAwLTIuMjUgMS4wMDQtMi4yNSAyLjIzOCAwIDIuMTQyIDMuMjc2IDUuMTkxIDUgNi41NjQgMS43MjQtMS4zNzQgNS00LjQyNyA1LTYuNTY0IDAtMS4yMzQtMS4wMDktMi4yMzgtMi4yNS0yLjIzOC0uODk3IDAtMS43MDcuNTI3LTIuMDYzIDEuMzQzLS4yMzguNTQ3LTEuMTM3LjU0Ny0xLjM3NSAwLS4zNTUtLjgxNi0xLjE2NS0xLjM0My0yLjA2Mi0xLjM0M3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im04LjI1IDIwaC0zYy0xLjI0MSAwLTIuMjUtMS4wMS0yLjI1LTIuMjV2LTYuMjVoLTEuNzVjLS42ODkgMC0xLjI1LS41NjEtMS4yNS0xLjI1IDAtLjM0OC4xNDgtLjY4Mi40MDYtLjkxNmw5LjU3Ni05LjEyN2MuMjktLjI3NS43NDYtLjI3NSAxLjAzNSAwbDIuNDgzIDIuMzYzdi0uODJjMC0uNDE0LjMzNi0uNzUuNzUtLjc1aDNjLjQxNCAwIC43NS4zMzYuNzUuNzV2NS4xMDhsMS42NzggMS42MDJjLjI5OS4yODYuMzExLjc2MS4wMjQgMS4wNjEtLjI4NS4zLS43Ni4zMTItMS4wNjEuMDI1bC0xLjkxLTEuODIzYy0uMTQ3LS4xNDItLjIzMS0uMzM4LS4yMzEtLjU0M3YtNC42OGgtMS41djEuODJjMCAuMy0uMTc5LjU3MS0uNDU1LjY4OS0uMjc3LjExOC0uNTk2LjA2MS0uODEzLS4xNDZsLTMuMjMyLTMuMDc3LTguNjE5IDguMjE0aDEuODY5Yy40MTQgMCAuNzUuMzM2Ljc1Ljc1djdjMCAuNDEzLjMzNi43NS43NS43NWgzYy40MTQgMCAuNzUuMzM2Ljc1Ljc1cy0uMzM2Ljc1LS43NS43NXptLTYuODE2LTkuNTczLS4wMDYuMDA2Yy4wMDItLjAwMi4wMDQtLjAwNC4wMDYtLjAwNnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
                    alt="casa"
                  />
                  <h2 className="h2">Mis espacios</h2>
                </Link>
              </div>
              <div className="newSpace">
                <Link to="new">
                  <img
                    className="casa"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wMDUgNTEyLjAwNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGNpcmNsZSByPSIyNTYuMDAyNSIgY3g9IjI1Ni4wMDI1IiBjeT0iMjU2LjAwMjUiIGZpbGw9IiMzNDNjNDQiIHNoYXBlPSJjaXJjbGUiPjwvY2lyY2xlPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNywwLDAsMC43LDc2LjgwMDY3MjYyNjQ5NTM4LDc2LjgwMDc1MDAxNzE2NjE0KSI+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggc3R5bGU9IiIgZD0iTTUxMS45OSwzNzguOTA5YzAtNjYuNzUtNTAuMDgzLTEyMi41NjQtMTE0LjQ1OC0xMzEuNjc3di01NS4wMTRsMTguNTMxLDE1LjU0OSAgICAgYzQuMzYsMy4yNyw5LjgxMSw1LjQ1LDE0LjE3MSw1LjQ1YzYuNTQsMCwxMS45OTEtMi4xOCwxNS4yNjEtNi41NDFjNy42MzEtOS44MTEsNi41NC0yMi44OTItMi4xOC0zMC41MjJMMjM5LjQ3LDUuMDExICAgICBjLTcuNjMxLTYuNTQtMTkuNjIxLTYuNTQtMjcuMjUyLDBMNy4yODMsMTc2LjE1NGMtOC43MjEsNy42MzEtOS44MTEsMjEuODAyLTIuMTgsMzAuNTIyYzcuNjMxLDguNzIxLDIxLjgwMiw5LjgxMSwzMC41MjIsMi4xOCAgICAgbDE5LjYyMS0xNi40ODJWMzkzLjA4YzAsMTEuOTkxLDkuODExLDIxLjgwMiwyMS44MDIsMjEuODAyaDE3My45NjRjMTUuODUxLDU1Ljc1OCw2Ny41ODcsOTcuMDE3LDEyOS4wNzgsOTcuMDE3ICAgICBDNDUzLjEyNiw1MTEuODk5LDUxMy4wOCw0NTEuOTQ0LDUxMS45OSwzNzguOTA5eiBNOTguNjYyLDE1NS45MDZMMjI2LjM4OSw0OC42MTVMMzU0LjEzLDE1NS44ICAgICBjLTAuMTI5LDAuOTU0LTAuMjAyLDEuOTI1LTAuMjAyLDIuOTEzdjg5LjYxNGMtNTkuMTE0LDExLjQzOS0xMDQuNzIsNjIuNDY5LTEwNy43NTQsMTI0LjA0Mkg5OC44NVYxNTguNzEzICAgICBDOTguODUsMTU3Ljc2MSw5OC43ODEsMTU2LjgyNiw5OC42NjIsMTU1LjkwNnogTTM4MC4wOTEsNDY5LjM4NmMtNTAuMTQ0LDAtOTAuNDc3LTQwLjMzMy05MC40NzctOTAuNDc3ICAgICBjMC01MC4xNDQsNDAuMzMzLTkwLjQ3Nyw5MC40NzctOTAuNDc3YzQ5LjA1NCwwLDkwLjQ3Nyw0MC4zMzMsOTAuNDc3LDkwLjQ3N0M0NzAuNTY3LDQyOS4wNTMsNDMwLjIzNCw0NjkuMzg2LDM4MC4wOTEsNDY5LjM4NnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMTAxMDEiIGNsYXNzPSIiPjwvcGF0aD4KCQkJPHBhdGggc3R5bGU9IiIgZD0iTTQyOC4wNTQsMzU2LjAxN2gtMjYuMTYydi0yNi4xNjJjMC0xMS45OTEtOS44MTEtMjEuODAyLTIxLjgwMi0yMS44MDIgICAgIGMtMTEuOTkxLDAtMjEuODAyLDkuODExLTIxLjgwMiwyMS44MDJ2MjYuMTYyaC0yNi4xNjJjLTExLjk5MSwwLTIxLjgwMiw5LjgxMS0yMS44MDIsMjEuODAyICAgICBjMCwxMS45OTEsOS44MTEsMjEuODAyLDIxLjgwMiwyMS44MDJoMjYuMTYydjI2LjE2MmMwLDExLjk5MSw5LjgxMSwyMS44MDIsMjEuODAyLDIxLjgwMmMxMC45MDEsMCwyMC43MTItOC43MjEsMjEuODAyLTIxLjgwMiAgICAgdi0yNi4xNjJoMjYuMTYyYzEwLjkwMSwwLDIxLjgwMi05LjgxMSwyMS44MDItMjEuODAyQzQ0OS44NTYsMzY1LjgyOCw0NDAuMDQ1LDM1Ni4wMTcsNDI4LjA1NCwzNTYuMDE3eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAxMDEwMSIgY2xhc3M9IiI+PC9wYXRoPgoJCTwvZz4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                    alt="casa-add"
                  />
                  <h2 className="h2">Crear espacio</h2>
                </Link>
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

                {/* 
                <Link className="joinUp" to="login">
                  <img className='casa' src={play} alt='join'/>
                </Link> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
