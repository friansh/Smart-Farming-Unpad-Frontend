import React, { useState } from "react";

import Navbar from "../components/Navbar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Alert from "react-bootstrap/Alert";
import Jumbotron from "react-bootstrap/Jumbotron";

import Slide1Image from "../assets/slider1.jpg";
import Slide2Image from "../assets/slider2.jpg";
import Slide3Image from "../assets/slider3.jpg";

import { Redirect } from "react-router-dom";

import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const login = (e) => {
    e.preventDefault();
    Axios.post("/user/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setRedirectToDashboard(true);
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (redirectToDashboard) return <Redirect to="/" />;

  return (
    <>
      <div style={{ backgroundColor: "#bdc3c7", minHeight: "100vh" }}>
        <Navbar />
        <Container className="mt-4">
          <Row>
            <Col md={8}>
              <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                  This is the Smart Farming Unpad's front end section. This
                  front end is currently in development process.
                </p>
              </Jumbotron>
              <Card className="mt-3">
                <Card.Body>
                  <small>
                    NodeMCU firmware, server MQTT engine, website backend, and
                    this frontend created by <b>Fikri Rida Pebriansyah</b>
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              {loginError ? (
                <Alert variant="danger">Invalid email or password.</Alert>
              ) : null}
              <Card>
                <Card.Body>
                  <h5>Please Login to Continue...</h5>
                  <hr />
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                      />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="float-right"
                      onClick={login}
                    >
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Carousel className="mt-3">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Slide1Image}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Slide2Image}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Slide3Image}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
