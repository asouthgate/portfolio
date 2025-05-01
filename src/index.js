import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // bundle includes Popper

import Layout from './pages/Layout';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import { HashRouter, Navigate, Routes, Route } from 'react-router-dom';

import packageJson from '../package.json'; // dont want to duplicate home var

// Ensure jQuery is available globally
window.$ = $;
window.jQuery = $;

$(document).ready(function () {
  console.log('Document is ready');
  console.log('jQuery version:', $.fn.jquery);
  console.log('Bootstrap is loaded:', typeof $.fn.tooltip !== 'undefined');
});

/**
 * App component represents the root of the application.
 * Routes are defined here using HashRouter.
 * E.g. /search to go to the search page.
 */
export default function App() {

  useEffect(() => {
    document.title = 'Alex Southgate - Research Software Engineer';
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
