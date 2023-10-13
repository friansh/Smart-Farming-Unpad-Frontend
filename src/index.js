import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";

import "jquery/dist/jquery.min.js";

import axios from "axios";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Device from "./Pages/Device";
import DatasetList from "./Pages/Dataset/List";
import DatasetData from "./Pages/Dataset/Data";
import DatasetDevice from "./Pages/Dataset/Device";
import ControlList from "./Pages/Control/List";
import ControlSwitch from "./Pages/Control/Switch";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (err) => Promise.reject(err)
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/device",
    element: <Device />,
  },
  {
    path: "/dataset",
    element: <DatasetList />,
  },
  {
    path: "/dataset/:dataset_id/device",
    element: <DatasetDevice />,
  },
  {
    path: "/dataset/:dataset_id/device/:device_id",
    element: <DatasetData />,
  },
  {
    path: "/control/list",
    element: <ControlList />,
  },
  {
    path: "/control/device/:device_id",
    element: <ControlSwitch />,
  },
]);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (error.response.status === 401) {
      router.navigate("/login");
      return Promise.reject(error);
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
