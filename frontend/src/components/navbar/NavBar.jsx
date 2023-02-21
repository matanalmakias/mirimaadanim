import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar className="mb-3 m-3 p-3" bg="light" expand="lg">
      <Navbar.Brand className="m-1" href="/">
        מירי מעדנים
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">עמוד בית</Nav.Link>
          <Nav.Link href="#about">אודות</Nav.Link>
          <Nav.Link href="#contact">צור קשר</Nav.Link>
          <Nav.Link href="/register">הרשמה</Nav.Link>
          <Nav.Link href="/login">התחברות</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
