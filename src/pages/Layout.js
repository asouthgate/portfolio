import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css';
import './common.css';

const Layout = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Exo&display=swap"
      />
      <div id="main-panel" className="">
        <Topbar/>
        <Outlet/>
      </div>
    </>
  );
};

export default Layout;
