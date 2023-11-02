import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";

export default function ControlSend(props) {
  const [customValue, setCustomValue] = useState();

  const handleCustomValueControlSend = () => {
    if (!customValue)
      return Swal.fire({
        icon: "error",
        text: "Please entry the desired control value to the textbox.",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });

    sentControlValue(customValue);
  };

  const handleOnControlSend = () => sentControlValue(1);
  const handleOffControlSend = () => sentControlValue(0);

  const sentControlValue = (data) => {
    axios
      .post(`/control/${props.control.control_id}`, {
        value: data,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          html: `Control value <b>${data}</b> has been queued to control id <b>${props.control.control_id}</b>`,
          toast: true,
          position: "top-right",
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">{props.control.control_name}</h3>
      </div>

      <div className="card-body">
        <p className="m-0">{props.control.control_description}</p>
        <small className="text-muted">{props.control.control_id}</small>

        <div className="btn-group w-100">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleOnControlSend}
          >
            <i className="fa-solid fa-plug mr-2" />
            On
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={handleOffControlSend}
          >
            <i className="fa-solid fa-power-off mr-2" />
            Off
          </button>
        </div>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Enter 3 digit numeric data (005 or 025 or 174)"
          onChange={(e) => setCustomValue(e.target.value)}
        />
      </div>
      <div className="card-footer">
        <button
          type="submit"
          className="btn btn-primary btn-sm float-right"
          onClick={handleCustomValueControlSend}
        >
          <i className="fa-solid fa-paper-plane mr-2" />
          Submit
        </button>
      </div>
    </div>
  );
}
