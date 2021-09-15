import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useParams } from "react-router";
import { io } from "socket.io-client";

import LoadingImage from "../assets/loading_buffering.gif";

export default function Surveillance() {
  const { dataset_id, device_id } = useParams();

  const [image, setImage] = useState(LoadingImage);
  const [deviceName, setDeviceName] = useState("");
  const [datasetName, setDatasetName] = useState("");

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_IO_URL);
    socket.on(`${dataset_id}/${device_id}`, (payload) => {
      setImage(payload);
    });
    setDeviceName(localStorage.getItem(device_id));
    setDatasetName(localStorage.getItem(dataset_id));
  }, [dataset_id, device_id]);

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#bdc3c7",
          minHeight: "100vh",
          paddingBottom: 20,
        }}
      >
        <Container className="pt-3">
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href={`/imagelist/${dataset_id}`}>
                {datasetName}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{deviceName}</Breadcrumb.Item>
              <Breadcrumb.Item active>Live Feeds</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row>
            <Col as={Card} body className="mt-1">
              <h3 style={{ textAlign: "center" }}>Live Image Feeds</h3>
              <div
                style={{ width: "100%" }}
                className="d-flex justify-content-center my-3"
              >
                <img
                  src={image}
                  className="float-center"
                  style={{ borderStyle: "inset", maxWidth: "100%" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
