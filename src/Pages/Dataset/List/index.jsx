import { useEffect, useState } from "react";
import Template from "../../../Template";

import axios from "axios";
import { Link } from "react-router-dom";

import Pages from "../../../Constants/Pages.json";

export default function Dataset(props) {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    axios.get("/dataset").then((response) => {
      setDatasets(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Template title="Dataset" userName="Fikri Rida P" page={Pages.Dataset}>
      <div className="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Select Dataset</h3>
              </div>

              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasets.map((dataset, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/dataset/${dataset._id}/device`}>
                              {dataset.name}
                            </Link>
                          </td>
                          <td>{dataset.description}</td>
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
      </div>{" "}
    </Template>
  );
}
