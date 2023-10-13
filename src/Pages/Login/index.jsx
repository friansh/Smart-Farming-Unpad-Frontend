import axios from "axios";
import { useState } from "react";

import Logo from "../../Assets/logo.png";

import "./index.css";
import { Navigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("/user/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.token);
        setRedirect("/");
      })
      .catch((error) => {
        console.log(error.response);
        setError(true);
      });
  };

  if (redirect != null) return <Navigate to={redirect} />;

  return (
    <div className="login-body">
      <div className="container-fluid pt-5">
        <div className="row justify-content-center mb-3">
          <div className="col-auto">
            <img src={Logo} height={65} />
          </div>
          <div className="col-auto">
            <p>
              <span
                className="font-weight-bolder"
                style={{ fontSize: "1.6em" }}
              >
                Smart Farming
              </span>
              <br />
              Universitas Padjadjaran
            </p>
          </div>
        </div>
        {error ? (
          <div className="row justify-content-center mt-3">
            <div className="col-md-4">
              <div class="alert alert-danger" role="alert">
                <i class="fa-solid fa-xmark mr-2" />
                Invalid email or password, please try again.
              </div>
            </div>
          </div>
        ) : null}
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Login</h3>
              </div>
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="login-email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="login-email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="login-password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-success float-right"
                    onClick={handleLogin}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket mr-2" />
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <p className="text-muted text-center w-100">
              Fikri Rida P., S.T. &copy; 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
