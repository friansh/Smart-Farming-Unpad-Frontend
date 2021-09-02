import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";

import Navbar from "../components/Navbar";

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

  const [devices, setDevices] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (redirectToLogin) return <Redirect to="/login" />;

  return (
    <>
      <div>
        <Navbar />
        <Container className="mt-3">
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
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/dataset/${val._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {val.name}
                      </Link>{" "}
                      <Badge variant="success">{val.data_type}</Badge>
                    </td>
                    <td>{val.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <h3>All Devices</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Last Heartbeat</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((dev, index) => {
                const lastHeartbeatWIB = new Date(dev.last_heartbeat);
                const nowTime = new Date();
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{dev.name}</td>
                    <td>{dev.description}</td>
                    <td>
                      {lastHeartbeatWIB.toLocaleString()}{" "}
                      <Badge variant="primary">{dev.firmware_version}</Badge>{" "}
                      {(nowTime - lastHeartbeatWIB) / 1000 / 60 > 15 ? (
                        <Badge variant="warning">Offline</Badge>
                      ) : (
                        <Badge variant="success">Online</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}
