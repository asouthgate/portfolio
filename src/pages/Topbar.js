import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as GitlabIcon } from 'bootstrap-icons/icons/gitlab.svg';
import { ReactComponent as GithubIcon } from 'bootstrap-icons/icons/github.svg';
import './topbar.css';

const app_version = process.env.REACT_APP_VERSION;

/**
 * Topbar navigation component with some links.
 */
const Topbar = () => {
  return (
    <div className="topbar-container">
      <nav id="topbar-nav" className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse">
          <div className="navbar-brand" href="#">
                Alex Southgate
          </div>
          <Link to="/about" className="nav-link topbar-nav-link">About </Link>
          <Link to="/projects" className="nav-link topbar-nav-link">Projects </Link>
          <Link to="/publications" className="nav-link topbar-nav-link">Publications </Link>
        </div>
        <div>
          <a 
            href="https://github.com/asouthgate" 
            className="nav-link topbar-nav-link" 
            style={{ color: 'white' }}
          >
            <GithubIcon width={24} height={24} />
          </a>
          <a 
            href="https://gitlab.com/asouthgate1" 
            className="nav-link topbar-nav-link" 
            style={{ color: 'white' }}
          >
            <GitlabIcon width={24} height={24} />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
