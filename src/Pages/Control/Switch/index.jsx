import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Template from "../../../Template";
import ControlSend from "../../../Components/ControlSend";

import Pages from "../../../Constants/Pages.json";

export default function Switch() {
  const [controls, setControls] = useState([]);

  const { device_id } = useParams();

  useEffect(() => {
    axios.get(`/control/device/${device_id}`).then((response) => {
      setControls(response.data);
    });
  }, []);

  return (
    <Template
      title={device_id}
      userName="Fikri Rida P"
      page={Pages.Control.List}
    >
      <div className="container-fluid">
        {controls.length == 0 ? (
          <div className="row">
            <div className="col">
              <div className="alert alert-warning" role="alert">
                <i class="fa-regular fa-folder-open mr-2" />
                There is no control assigned to this device.
              </div>
            </div>
          </div>
        ) : null}
        <div className="row">
          {controls.map((control) => {
            return (
              <div key={control.control_id} className="col-md-3">
                <ControlSend control={control} />
              </div>
            );
          })}
        </div>
      </div>
    </Template>
  );
}
