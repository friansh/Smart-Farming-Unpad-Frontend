import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">
        Smart Farming Unpad
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" active={props.HomeActive}>
            Home
          </Nav.Link>
          <Nav.Link href="#datasets" active={props.DatasetsActive}>
            Datasets
          </Nav.Link>
          <Nav.Link href="#data" active={props.DataActive}>
            Data
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
