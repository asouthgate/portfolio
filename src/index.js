import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // bundle includes Popper

import Layout from './pages/Layout';
import Publications from './pages/Publications';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
 * Routes are defined here using BrowserRouter.
 * E.g. /search to go to the search page.
 */
export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/publications" element={<Publications />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
