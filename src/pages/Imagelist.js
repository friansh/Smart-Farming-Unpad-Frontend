import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export default function Imagelist() {
  const { dataset_id } = useParams();

  const [liveDevices, setLiveDevices] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    Axios.get(`/imagelist/${dataset_id}/live`).then((res) => {
      setLiveDevices(res.data);
    });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#bdc3c7",
          minHeight: "100vh",
          paddingBottom: 20,
        }}
      >
        <Navbar DatasetsActive />
        <Container className="mt-3">
          <Row as={Card} body>
            <h3>{localStorage.getItem(dataset_id)} Dataset</h3>
            <h6>Select one of the device below to open the image page.</h6>
          </Row>
          <Row as={Card} body className="mt-2">
            <h5>Saved images</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((dev, index) => {
                  localStorage.setItem(dev.device_id, dev.name);
                  const lastUpdateWIB = new Date(dev.last_update);
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/imagelist/${dataset_id}/${dev.device_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {dev.name}
                        </Link>
                      </td>
                      <td>{dev.description}</td>
                      <td>{lastUpdateWIB.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
          <Row as={Card} body className="mt-2">
            <h5>Live Image Feeds</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {liveDevices.map((dev, index) => {
                  localStorage.setItem(dev.device_id, dev.name);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/surveillance/${dataset_id}/${dev.device_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {dev.name}
                        </Link>
                      </td>
                      <td>{dev.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    </>
  );
}
