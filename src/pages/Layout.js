import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css';


const Layout = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Exo&display=swap"
      />
      <div className="container-fluid">
        <div className="row">
          Alex Southgate
        </div>
        <div id="main-panel" className="row">
          <div id="outlet" className="col-12">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
