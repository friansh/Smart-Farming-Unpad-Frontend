import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Template from "../../../Template";

export default function Switch() {
  const [controls, setControls] = useState([]);

  const { device_id } = useParams();

  useEffect(() => {
    axios.get(`/control/device/${device_id}`).then((response) => {
      setControls(response.data);
    });
  }, []);

  return (
    <Template title={device_id}>
      <div className="container-fluid">
        <div className="row">
          {controls.map((control) => {
            return (
              <div className="col-md-3">
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">{control.control_name}</h3>
                  </div>

                  <div className="card-body">
                    <p className="m-0">{control.control_description}</p>
                    <small className="text-muted">{control.control_id}</small>

                    <div class="btn-group w-100">
                      <button type="button" class="btn btn-success">
                        <i class="fa-solid fa-plug mr-2" />
                        On
                      </button>
                      <button type="button" class="btn btn-info">
                        <i class="fa-solid fa-power-off mr-2" />
                        Off
                      </button>
                    </div>
                    <input
                      type="number"
                      className="form-control mt-3"
                      placeholder="Enter numeric data"
                    />
                  </div>
                  <div className="card-footer">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm float-right  "
                    >
                      <i className="fa-solid fa-paper-plane mr-2" />
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Template>
  );
}
