import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router";
import { logout } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";

function NavBar() {
  const { user } = useAuth();
  // const [redirect, setRedirect] = React.useState(false);
  const [show, setShow] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false)

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    // setRedirect(true);
  };
  const refreshNav = () => {
    if (localStorage.getItem('user')) {
      setShow(true);
      setRefresh(!refresh);
    } else {
      setShow(false);
      setRefresh(!refresh);
    }
  };
  useEffect(() => {
    refreshNav();
  }, []);

  return (
    <>
      {/* {redirect ? <Redirect to="/" /> : null} */}
      {show ? (
        <Navbar expanded={expanded}  bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand href="/">Roomies</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={() => setExpanded(false)} className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/spaces">Espacios</Nav.Link>
              <Nav.Link href="/about-us">Contact Us</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar expanded={expanded}  bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand href="/">Roomies</Navbar.Brand>
          <Navbar.Toggle  onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav onClick={() => setExpanded(false)}  className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>
              <Nav.Link href="/spaces">Espacios</Nav.Link>
              <Nav.Link href="/about-us">Contact Us</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
}

export default NavBar;
