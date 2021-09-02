import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Smart Farming Unpad Portal
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
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
      </Container>
    </BootstrapNavbar>
  );
}
