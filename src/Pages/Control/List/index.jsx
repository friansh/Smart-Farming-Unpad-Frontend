import { useEffect, useState } from "react";
import Template from "../../../Template";

import axios from "axios";
import { Link } from "react-router-dom";

import Pages from "../../../Constants/Pages.json";

export default function List(props) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get("/device").then((response) => {
      setDevices(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Template title="Control" userName="Fikri Rida P" page={Pages.Control.List}>
      <div className="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Select Device</h3>
              </div>

              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
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
                    {devices.map((device, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/control/device/${device.id}`}>
                              {device.name}
                            </Link>
                          </td>
                          <td>{device.description}</td>
                          <td>{device.last_heartbeat}</td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
