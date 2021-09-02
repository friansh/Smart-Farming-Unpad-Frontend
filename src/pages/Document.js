import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Line } from "react-chartjs-2";

import { useParams } from "react-router-dom";
import Axios from "axios";

export default function Document() {
  const { dataset_id, device_id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`/dataset/${dataset_id}/${device_id}`).then((res) => {
      const dataArr = res.data.map((val) => {
        {
          return ((1023 - val.value) / 1023) * 100;
        }
      });
      const labelArr = res.data.map((val) => {
        {
          return new Date(val.uploaded).toLocaleString();
        }
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
              {localStorage.getItem(dataset_id)}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {localStorage.getItem(device_id)}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Card body>
            <h5 style={{ textAlign: "center" }}>
              {localStorage.getItem(device_id)}'s Data Graph
            </h5>
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
            <Button className="float-right mt-3">Download CSV file</Button>
          </Card>
        </Container>
      </div>
    </>
  );
}
