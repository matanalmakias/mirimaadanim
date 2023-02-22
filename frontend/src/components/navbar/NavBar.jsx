import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

const NavBar = () => {
  const { isLoggedIn, logout, isManager } = useContext(AuthContext);
  const nav = useNavigate();
  const logoutButton = async () => {
    try {
      authService.logout();
      nav("/");
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Navbar className=" m-3 p-3" bg="light" expand="lg">
        <Navbar.Brand className="m-1" href="/">
          מירי מעדנים
        </Navbar.Brand>
        <br />
        <br />
        <br />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#about">אודות</Nav.Link>
            <Nav.Link href="#contact">צור קשר</Nav.Link>
            {isLoggedIn === false ? (
              <>
                <Nav.Link href="/register">הרשמה</Nav.Link>
                <Nav.Link href="/login">התחברות</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={logoutButton}>התנתקות</Nav.Link>
            )}
            {isManager && <Nav.Link href="/manager">כניסה למנהלים</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
