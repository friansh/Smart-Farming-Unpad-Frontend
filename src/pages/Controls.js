import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faLightbulb as faLightbulbSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faLightbulbRegular } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function Controls() {
  const { device_id } = useParams();

  const [deviceName, setDeviceName] = useState("");
  const [controls, setControls] = useState([]);
  const [historyShow, setHistoryShow] = useState(false);
  const [controlHistory, setControlHistory] = useState([]);
  const [controlHistoryLoading, setControlHistoryLoading] = useState(true);

  useEffect(() => {
    setDeviceName(localStorage.getItem(device_id));

    Axios.get(`/control/device/${device_id}`).then((res) => {
      setControls(res.data);
    });
  }, []);

  const handleSwitchOn = (e) => {
    Axios.post(`/control/${e.target.dataset.controlId}`, {
      value: 1,
    })
      .then(() => {
        Swal.fire(
          "Command Sent!",
          "The command to <b>turn on</b> the control has successfully sent!",
          "success"
        );
      })
      .catch((err) => {
        console.error(err.response);
        Swal.fire(
          "Failed!",
          "Failed to send the <b>turn on</b> control!",
          "error"
        );
      });
  };

  const handleSwitchOff = (e) => {
    Axios.post(`/control/${e.target.dataset.controlId}`, {
      value: 0,
    })
      .then(() => {
        Swal.fire(
          "Command Sent!",
          "The command to <b>turn off</b> the control has successfully sent!",
          "success"
        );
      })
      .catch((err) => {
        console.error(err.response);
        Swal.fire(
          "Failed!",
          "Failed to send the <b>turn off</b> control!",
          "error"
        );
      });
  };

  const handleHistoryOpen = (e) => {
    setControlHistoryLoading(true);
    Axios.get(`/control/history/${e.target.dataset.controlId}`)
      .then((res) => {
        setControlHistory(res.data);
      })
      .finally(() => {
        setControlHistoryLoading(false);
      });

    setHistoryShow(true);
  };
  const handleHistoryClose = () => setHistoryShow(false);

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
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Controls</Breadcrumb.Item>
              <Breadcrumb.Item active>{deviceName}</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row>
            <Container fluid>
              <Row>
                {controls.map((con, index) => {
                  return (
                    <Col md={3} sm={6} className="px-1 mb-2" key={index}>
                      <Card body>
                        <h5>{con.control_name}</h5>
                        <hr />
                        <ButtonGroup className="w-100 mb-3">
                          <Button
                            variant="success"
                            data-control-id={con.control_id}
                            onClick={handleSwitchOn}
                          >
                            <FontAwesomeIcon icon={faLightbulbSolid} /> On
                          </Button>
                          <Button
                            variant="secondary"
                            data-control-id={con.control_id}
                            onClick={handleSwitchOff}
                          >
                            <FontAwesomeIcon icon={faLightbulbRegular} /> Off
                          </Button>
                        </ButtonGroup>
                        <small className="text-muted">
                          {con.control_description}
                        </small>
                        <br />
                        <Button
                          variant="primary"
                          className="float-right"
                          data-control-name={con.control_name}
                          data-control-id={con.control_id}
                          onClick={handleHistoryOpen}
                        >
                          <FontAwesomeIcon icon={faHistory} />
                        </Button>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
    </>
  );
}
