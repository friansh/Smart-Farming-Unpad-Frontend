import Logo from "../../Assets/logo.png";
import User from "../../Assets/user.jpeg";

import { Link, NavLink } from "react-router-dom";

import Pages from "../../Constants/Pages.json";

import $ from "jquery";

$(document).ready(() => {
  $("body").Layout();
  $(".sidebar-toggle-btn").PushMenu();
});

export default function Sidebar(props) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/" className="brand-link">
        <img
          src={Logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Smart Farming</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={User} className="img-circle elevation-2" alt="User" />
          </div>
          <div className="info">
            <Link to="/" className="d-block">
              {props.userName}
            </Link>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink
                to="/"
                className={`nav-link sidebar-toggle-btn ${
                  props.page == Pages.Dashboard ? "active" : null
                }`}
                data-widget="pushmenu"
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li className="nav-header">Data Management</li>
            <li className="nav-item">
              <NavLink
                to="/dataset"
                className={`nav-link sidebar-toggle-btn ${
                  props.page == Pages.Dataset ? "active" : null
                }`}
                data-widget="pushmenu"
              >
                <i className="nav-icon fa-solid fa-chart-line" />
                <p>Dataset</p>
              </NavLink>
            </li>
            <li
              className={`nav-item ${
                props.page == Pages.Control.List ? "menu-open" : null
              }`}
            >
              <a
                href="#"
                className={`nav-link ${
                  props.page == Pages.Control.List ? "active" : null
                }`}
              >
                <i className="nav-icon fa-solid fa-toggle-on" />
                <p>
                  Control
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink
                    to="/control/list"
                    className={`nav-link sidebar-toggle-btn ${
                      props.page == Pages.Control.List ? "active" : null
                    }`}
                    data-widget="pushmenu"
                  >
                    <i className="fa-solid fa-list-ul nav-icon" />
                    <p>List</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a href="pages/UI/icons.html" className="nav-link">
                    <i className="fa-solid fa-pen-to-square nav-icon" />
                    <p>Assign</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/UI/icons.html" className="nav-link">
                    <i className="fa-solid fa-clock-rotate-left nav-icon" />
                    <p>History</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-header">Device Management</li>
            <li className="nav-item">
              <NavLink
                to="/device"
                className={`nav-link sidebar-toggle-btn`}
                data-widget="pushmenu"
              >
                <i className="nav-icon fa-solid fa-microchip" />
                <p>Device</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/teachers" className={`nav-link`}>
                <i className="nav-icon fa-solid fa-upload" />
                <p>Firmware</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
