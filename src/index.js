import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout';
import Publications from './pages/Publications';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/publications" element={<Publications />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
