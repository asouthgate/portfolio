import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as GitlabIcon } from 'bootstrap-icons/icons/gitlab.svg';
import { ReactComponent as GithubIcon } from 'bootstrap-icons/icons/github.svg';
import './topbar.css';

const Topbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">Projects </Link>
            </li>
            <li className="nav-item">
              <Link to="/publications" className="nav-link">Publications </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
