import Template from "../../Template";

import Pages from "../../Constants/Pages.json";
import axios from "axios";
import { useEffect, useState } from "react";

function checkSensor(status) {
  switch (status) {
    case "baik":
      return (
        <div
          className="d-block rounded-circle bg-success mb-3"
          style={{ height: 35, width: 35 }}
        ></div>
      );
    case "buruk":
      return (
        <div
          className="d-block rounded-circle bg-warning mb-3"
          style={{ height: 35, width: 35 }}
        ></div>
      );
    case "sangat buruk":
      return (
        <div
          className="d-block rounded-circle bg-danger mb-3"
          style={{ height: 35, width: 35 }}
        ></div>
      );
  }
}

export default function Dashboard() {
  const [sensorsState, setSensorsState] = useState({});

  useEffect(() => {
    axios
      .get("https://api-status-sensor.smartfarmingunpad.com/sensor/data")
      .then((response) => {
        console.log(response.data);
        setSensorsState(response.data);
      });
  }, []);

  return (
    <Template userName="Fikri Rida P" title="Dashboard" page={Pages.Dashboard}>
      <div className="container-fluid">
        {/* <div className="row">
          <div className="col">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Kosong</h3>
              </div>
              <div className="card-body">Sementara masih kosong</div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-auto">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Status Sensor</h3>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-auto p-4 border">
                      <span className="d-block w-100 text-center mb-3 font-weight-bolder">
                        P1
                      </span>
                      {checkSensor(sensorsState.barisan1?.sensor1)}
                      {checkSensor(sensorsState.barisan1?.sensor2)}
                      {checkSensor(sensorsState.barisan1?.sensor3)}
                      {checkSensor(sensorsState.barisan1?.sensor4)}
                      {checkSensor(sensorsState.barisan1?.sensor5)}
                      {checkSensor(sensorsState.barisan1?.sensor6)}
                    </div>
                    <div className="col-auto p-4 border">
                      <span className="d-block w-100 text-center mb-3 font-weight-bolder">
                        P2
                      </span>
                      {checkSensor(sensorsState.barisan2?.sensor1)}
                      {checkSensor(sensorsState.barisan2?.sensor2)}
                      {checkSensor(sensorsState.barisan2?.sensor3)}
                      {checkSensor(sensorsState.barisan2?.sensor4)}
                      {checkSensor(sensorsState.barisan2?.sensor5)}
                      {checkSensor(sensorsState.barisan2?.sensor6)}
                    </div>
                    <div className="col-auto p-4 border">
                      <span className="d-block w-100 text-center mb-3 font-weight-bolder">
                        P3
                      </span>
                      {checkSensor(sensorsState.barisan3?.sensor1)}
                      {checkSensor(sensorsState.barisan3?.sensor2)}
                      {checkSensor(sensorsState.barisan3?.sensor3)}
                      {checkSensor(sensorsState.barisan3?.sensor4)}
                      {checkSensor(sensorsState.barisan3?.sensor5)}
                      {checkSensor(sensorsState.barisan3?.sensor6)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
