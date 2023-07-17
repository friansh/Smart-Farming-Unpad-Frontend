import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFileDownload,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

export default function Document() {
  const { dataset_id, device_id } = useParams();

  const [data, setData] = useState({labels: [], datasets:[{data: []}]});
  const [deviceName, setDeviceName] = useState("");
  const [datasetName, setDatasetName] = useState("");
  const [mapFromLow, setMapFromLow] = useState("");
  const [mapFromHigh, setMapFromHigh] = useState("");
  const [mapToLow, setMapToLow] = useState("");
  const [mapToHigh, setMapToHigh] = useState("");
  const [mappingFinished, setMappingFinished] = useState(false);

  useEffect(() => {
    setDeviceName(localStorage.getItem(device_id));
    setDatasetName(localStorage.getItem(dataset_id));
    Axios.get(`/dataset/${dataset_id}/${device_id}`).then((res) => {
      const dataArr = res.data.map((val) => {
        return val.value;
      });
      const labelArr = res.data.map((val) => {
        return new Date(val.uploaded).toLocaleString();
      });

      setData({
        labels: labelArr,
        datasets: [
          {
            data: dataArr,
            borderColor: "#3e95cd",
            fill: false,
          },
        ],
      });
    });
  }, []);

  const downloadCSV = () => {
    Swal.fire("Information", "Coming soon :)", "info");
  };

  const cleanDeviceData = (e) => {
    Swal.fire({
      icon: "question",
      title: "Deletion Confirmation",
      html: `Are you sure want to clean the <b>${e.target.dataset.deviceName}</b>'s device data from <b>${e.target.dataset.datasetName}</b> dataset?`,
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Cleaned!",
          "The device data was successfully cleaned.",
          "success"
        );
      }
    });
  };

  const mapData = () => {
    if (
      !/^\d+$/.test(mapFromLow) ||
      !/^\d+$/.test(mapToLow) ||
      !/^\d+$/.test(mapFromHigh) ||
      !/^\d+$/.test(mapToHigh)
    ) {
      Swal.fire(
        "Error Mapping",
        "Invalid value in data mapping field. Please recheck and try again.",
        "error"
      );
      return;
    }

    const parsedMapFromLow = parseInt(mapFromLow);
    const parsedMapFromHigh = parseInt(mapFromHigh);
    const parsedMapToLow = parseInt(mapToLow);
    const parsedMapToHigh = parseInt(mapToHigh);

    const newDataArr = data.datasets[0].data.map((val) => {
      return (
        ((val - parsedMapFromLow) * (parsedMapToHigh - parsedMapToLow)) /
          (parsedMapFromHigh - parsedMapFromLow) +
        parsedMapToLow
      );
    });

    setData({
      labels: data.labels,
      datasets: [
        {
          data: newDataArr,
          borderColor: data.datasets[0].borderColor,
          fill: data.datasets[0].fill,
        },
      ],
    });

    setMappingFinished(true);
    Swal.fire(
      "Mapping Finished",
      "The data mapping has been finished.",
      "info"
    );
  };

  const handleMapFromLowChange = (e) => {
    setMapFromLow(e.target.value);
  };

  const handleMapFromHighChange = (e) => {
    setMapFromHigh(e.target.value);
  };

  const handleMapToLowChange = (e) => {
    setMapToLow(e.target.value);
  };

  const handleMapToHighChange = (e) => {
    setMapToHigh(e.target.value);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#bdc3c7",
          minHeight: "100vh",
          paddingBottom: 20,
        }}
      >
        <Navbar DataActive />
        <Container className="mt-3">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={`/dataset/${dataset_id}`}>
              {datasetName}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{deviceName}</Breadcrumb.Item>
          </Breadcrumb>
          <Card body>
            <h5 style={{ textAlign: "center" }}>{deviceName}'s Data Graph</h5>
            <Line
              data={data}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
            <hr />
            <Container>
              <Row>
                <Col as={Card} md={6} className="mb-3">
                  <Form className="m-3">
                    <h6 style={{ textAlign: "center" }}>Data Mapping</h6>
                    <Container className="mt-3">
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>In min:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="In min"
                              value={mapFromLow}
                              onChange={handleMapFromLowChange}
                              disabled={mappingFinished}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>In max:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="In max"
                              value={mapFromHigh}
                              onChange={handleMapFromHighChange}
                              disabled={mappingFinished}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Out min:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Out min"
                              value={mapToLow}
                              onChange={handleMapToLowChange}
                              disabled={mappingFinished}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Out max:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Out max"
                              value={mapToHigh}
                              onChange={handleMapToHighChange}
                              disabled={mappingFinished}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            variant="success"
                            className="float-right"
                            data-device-name={deviceName}
                            data-dataset-name={datasetName}
                            onClick={mapData}
                            disabled={mappingFinished}
                          >
                            Map <FontAwesomeIcon icon={faArrowRight} />
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                </Col>
                <Col md={6} className="p-0">
                  <ButtonGroup className="float-right">
                    <Button
                      variant="danger"
                      data-device-name={deviceName}
                      data-dataset-name={datasetName}
                      onClick={cleanDeviceData}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Clean
                    </Button>
                    <Button variant="primary" onClick={downloadCSV}>
                      <FontAwesomeIcon icon={faFileDownload} /> Download CSV
                      file
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Container>
          </Card>
        </Container>
      </div>
    </>
  );
}
