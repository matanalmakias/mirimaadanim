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
          {cart.length > 0 && (
            <div>
              <h4>Cart:</h4>
              {cart.map((item, index) => (
                <Row key={index}>
                  <span className="fw-bolder p-2">
                    מחיר: {"   "}
                    {item.price}
                  </span>
                  <span className="fw-bolder p-2">
                    תיאור: {"   "}
                    {item.description}{" "}
                  </span>
                  <Col>
                    <span className="fw-bolder p-2">
                      כמות: {"   "}
                      {item.quantity}{" "}
                    </span>
                  </Col>
                </Row>
              ))}
              <Button onClick={checkout}>Checkout</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
