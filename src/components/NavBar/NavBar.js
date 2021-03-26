import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router";
import { logout } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";

function NavBar() {
  const { user, setUser } = useAuth();
  const [redirect, setRedirect] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    setUser({ isLogged: false });
    setRedirect(true);
  };
  const refreshNav = () => {
    if (localStorage.getItem("user")) {
      setRefresh(!refresh);
    } else {
      setRefresh(!refresh);
    }
  };
  useEffect(() => {
    refreshNav();
  }, []);

  return (
    <>
      {redirect ? <Redirect to="/" /> : null}
      {user && user.isLogged ? (
        <Navbar
          expanded={expanded}
          bg="dark"
          variant="dark"
          expand="lg"
          sticky="top"
        >
          <Navbar.Brand href="/">Roomies</Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setExpanded(expanded ? false : "expanded")}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={() => setExpanded(false)} className="mr-auto">
              <Nav.Link href="/spaces">Mis espacios</Nav.Link>
              <Nav.Link href="/new">Crear espacio</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar
          expanded={expanded}
          bg="dark"
          variant="dark"
          expand="lg"
          sticky="top"
        >
          <Navbar.Brand href="/">Roomies</Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setExpanded(expanded ? false : "expanded")}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={() => setExpanded(false)} className="mr-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
}

export default NavBar;
