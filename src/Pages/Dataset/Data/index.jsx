import { useEffect, useState } from "react";

import Template from "../../../Template";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import axios from "axios";
import { useParams } from "react-router-dom";

import Pages from "../../../Constants/Pages.json";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import DateTimePicker from "react-datetime-picker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function Data(props) {
  const [data, setData] = useState({ labels: [], datasets: [{ data: [] }] });

  let before = new Date();
  before.setHours(0);
  before.setMinutes(0);
  before.setSeconds(0);

  let after = new Date();
  after.setHours(24);
  after.setMinutes(0);
  after.setSeconds(0);

  const [filterStartTime, setFilterStartTime] = useState(before);
  const [filterEndTime, setFilterEndTime] = useState(after);

  const { dataset_id, device_id } = useParams();

  useEffect(() => {
    axios.get(`/dataset/${dataset_id}/${device_id}`).then((res) => {
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
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            fill: false,
          },
        ],
      });
    });
  }, []);

  return (
    <Template
      title={`${dataset_id} - ${device_id}`}
      userName="Fikri Rida P"
      page={Pages.Dataset}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">
                  <i class="fa-solid fa-filter mr-2" />
                  Filter Data
                </h3>
              </div>

              <div className="card-body">
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">
                    From Time
                  </label>
                  <div class="col-sm-10">
                    <DateTimePicker
                      onChange={setFilterStartTime}
                      value={filterStartTime}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">
                    To Time
                  </label>
                  <div class="col-sm-10">
                    <DateTimePicker
                      onChange={setFilterEndTime}
                      value={filterEndTime}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">
                    Exclude data value above
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="number"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Ceiling Value"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">
                    Exclude data value below
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="number"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Floor Value"
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary float-right"
                >
                  <i className="fa-solid fa-magnifying-glass mr-2" /> Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="far fa-chart-bar mr-2" />
                  Data Chart
                </h3>
              </div>
              <div className="card-body">
                <Line
                  options={{
                    responsive: true,
                  }}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
