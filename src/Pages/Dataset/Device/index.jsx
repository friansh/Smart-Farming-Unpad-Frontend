import { useEffect, useState } from "react";
import Template from "../../../Template";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Pages from "../../../Constants/Pages.json";

export default function Device(props) {
  const [devices, setDevices] = useState([]);

  const { dataset_id } = useParams();

  useEffect(() => {
    axios
      .get(`/dataset/${dataset_id}/device`)
      .then((response) => {
        setDevices(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  }, [dataset_id]);

  return (
    <Template
      title={`Dataset ${dataset_id}`}
      userName="Fikri Rida P"
      page={Pages.Dataset}
    >
      <div className="container-fluid">
        {devices.length == 0 ? (
          <div className="row">
            <div className="col">
              <div className="alert alert-warning" role="alert">
                <i class="fa-regular fa-folder-open mr-2" />
                There is no data from any device.
              </div>
            </div>
          </div>
        ) : null}

        <div class="row">
          <div class="col-12">
            <div class="card">
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
                            <Link
                              to={`/dataset/${dataset_id}/device/${device.device_id}`}
                            >
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
