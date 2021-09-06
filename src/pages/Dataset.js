import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
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

export default function Dataset() {
  const { dataset_id } = useParams();

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    Axios.get(`/dataset/${dataset_id}/device`).then((res) => {
      let devices = res.data;
      devices.sort(compare);
      setDevices(devices);
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
          <Row>
            <Card body className="w-100">
              <h3>{localStorage.getItem(dataset_id)} Dataset</h3>
              <h6>Select one of the device below to open the data page.</h6>
            </Card>
          </Row>
          <Row as={Card} className="mt-2">
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
                          to={`/dataset/${dataset_id}/${dev.device_id}`}
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
        </Container>
      </div>
    </>
  );
}
