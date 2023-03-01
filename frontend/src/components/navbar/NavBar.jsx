import React, { useContext } from "react";
import { Navbar, Nav, Row, Col, Container, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { StoreContext } from "../../context/StoreContext";

const NavBar = () => {
  const { isLoggedIn, logout, isManager } = useContext(AuthContext);
  const { checkout, cart } = useContext(StoreContext);
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
    <div className="d-flex justify-content-center align-items-center text-center">
      <Navbar className=" m-3 p-3" bg="light" expand="lg">
        <Navbar.Brand className="" onClick={() => nav("/")}>
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
            {isLoggedIn && (
              <Nav.Link onClick={() => nav("/user/cart")}>סל קניות</Nav.Link>
            )}

            {isLoggedIn === false ? (
              <>
                <Nav.Link onClick={() => nav("/register")}>הרשמה</Nav.Link>
                <Nav.Link onClick={() => nav("/login")}>התחברות</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={logoutButton}>התנתקות</Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link onClick={() => nav("/user-management")}>
                ניהול חשבון
              </Nav.Link>
            )}
            {isManager && (
              <Nav.Link onClick={() => nav("/manager")}>כניסה למנהלים</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
