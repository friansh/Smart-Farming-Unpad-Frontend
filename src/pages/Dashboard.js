import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

function compare(a, b) {
  if (a.description < b.description) {
    return -1;
  }
  if (a.description > b.description) {
    return 1;
  }
  return 0;
}

export default function Dashboard() {
  useEffect(() => {
    Axios.get("/device")
      .then((res) => {
        let devices = res.data;
        devices.sort(compare);
        setDevices(devices);
      })
      .catch((err) => {
        if (err.response.status == 401) setRedirectToLogin(true);
      });

    Axios.get("/dataset")
      .then((res) => {
        setDatasets(res.data);
      })
      .catch((err) => {
        if (err.response.status == 401) setRedirectToLogin(true);
      });
  }, []);

  const deleteDevice = (e) => {
    Swal.fire({
      icon: "question",
      title: "Deletion Confirmation",
      html: `Are you sure want to delete device <b>${e.target.dataset.deviceName}</b>?`,
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "The device was successfully deleted.",
          "success"
        );
      }
    });
  };

  const renameDevice = (e) => {
    Swal.fire("Feature information", "Coming soon :)", "info");
  };

  const [devices, setDevices] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (redirectToLogin) return <Redirect to="/login" />;

  return (
    <>
      <div
        style={{
          backgroundColor: "#bdc3c7",
          minHeight: "100vh",
          paddingBottom: 20,
        }}
      >
        <Navbar />
        <Container className="mt-3">
          <Row>
            <Col as={Card} body className="p-0">
              <h3>All Dataset</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {datasets.map((val, index) => {
                    localStorage.setItem(val._id, val.name);
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Link
                            to={
                              val.data_type == "number"
                                ? `/dataset/${val._id}`
                                : `/imagelist/${val._id}`
                            }
                            style={{ textDecoration: "none" }}
                          >
                            {val.name}
                          </Link>{" "}
                          <Badge
                            variant={
                              val.data_type == "number" ? "success" : "dark"
                            }
                          >
                            {val.data_type}
                          </Badge>
                        </td>
                        <td>{val.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={9}></Col>
            <Col md={3} as={Card} body>
              <span>
                Offline threshold: <b>15 minutes</b>
              </span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col as={Card} body className="p-0">
              <Container>
                <Row>
                  <Col>
                    <h3>All Devices</h3>
                  </Col>
                  <Col>
                    <Button variant="success" className="float-right mb-3">
                      <FontAwesomeIcon icon={faPlusSquare} /> Add a new device
                    </Button>
                  </Col>
                </Row>
              </Container>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Last Heartbeat</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((dev, index) => {
                    const lastHeartbeatWIB = new Date(dev.last_heartbeat);
                    const nowTime = new Date();
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{dev.name}</td>
                        <td>{dev.description}</td>
                        <td>
                          {lastHeartbeatWIB.toLocaleString()}{" "}
                          <Badge variant="primary">
                            {dev.firmware_version}
                          </Badge>{" "}
                          {(nowTime - lastHeartbeatWIB) / 1000 / 60 > 15 ? (
                            <Badge variant="warning">Offline</Badge>
                          ) : (
                            <Badge variant="success">Online</Badge>
                          )}
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="info">
                              Action
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                data-device-id={dev._id}
                                data-device-name={dev.name}
                                onClick={deleteDevice}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                              </Dropdown.Item>
                              <Dropdown.Item
                                data-device-id={dev._id}
                                data-device-name={dev.name}
                                onClick={renameDevice}
                              >
                                <FontAwesomeIcon icon={faPen} /> Rename
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
