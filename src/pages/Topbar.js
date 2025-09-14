import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as GitlabIcon } from 'bootstrap-icons/icons/gitlab.svg';
import { ReactComponent as GithubIcon } from 'bootstrap-icons/icons/github.svg';
import './topbar.css';

const Topbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom auto-m">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link"> 1/ Home </Link>
            </li>
            <li className="nav-item">
              <Link to="/publications" className="nav-link"> 2/ Publications </Link>
            </li>
            <li className="nav-item dropdown custom-dropdown-menu">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                3/ Blog
              </a>
              <ul className="dropdown-menu custom-dropdown" aria-labelledby="navbarDropdown">
                <li><Link to="/surprisingly-hard" className="dropdown-item"> Surprisingly hard: GPU particle index </Link></li>
                <li><Link to="/vulkan-gpu-mini-cluster" className="dropdown-item"> Vulkan and the GPU as a mini compute cluster </Link></li>
                <li><Link to="/smoothed-particle-hydrodynamics" className="dropdown-item"> Smoothed particle hydrodynamics </Link></li>
                <li><Link to="/a-walk-through-unfamiliar-science-part-1" className="dropdown-item"> A walk through unfamiliar science, part 1 </Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link"> 4/ Contact </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
            <a href="https://github.com/asouthgate">
                <GithubIcon style={{ width: '20px', height: '20px', color: '#fffcc9' }}/>
            </a>
            <div style={{ padding: '8px' }}>  </div>
            <a href="https://gitlab.com/asouthgate1">
                <GitlabIcon style={{ width: '20px', height: '20px', color: '#fffcc9' }}/>
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
