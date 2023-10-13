import { useEffect, useState } from "react";
import Template from "../../Template";

import axios from "axios";

export default function Device(props) {
  const [devices, setDevices] = useState([]);
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    axios.get("/device").then((response) => {
      setDevices(response.data);
    });
  }, []);

  const handleGetDeviceToken = (e) => {
    e.preventDefault();

    axios.get(`/device/${e.target.dataset.deviceId}`).then((response) => {
      setDeviceToken(response.data.token);
    });
  };

  return (
    <Template title="Device" userName="Fikri Rida P">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Select Device</h3>
              </div>

              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              data-device-id={device.id}
                              onClick={handleGetDeviceToken}
                            >
                              {device.name}
                            </a>
                            <span className="badge badge-success ml-2">
                              {device.firmware_version}
                            </span>
                            <br />
                            <small className="text-muted">
                              Id: {device.id}
                            </small>
                          </td>
                          <td>{device.description}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              <i className="fa-solid fa-trash" />
                            </button>
                          </td>
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

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title" id="exampleModalLabel">
                <i className="fa-solid fa-key mr-2" />
                Device Token
              </h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{deviceToken}</p>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
