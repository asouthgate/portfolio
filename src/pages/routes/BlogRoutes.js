import { Route } from 'react-router-dom';
import BlogTemplate from '../blog/BlogTemplate';

import Walk1, { metadata as meta1 } from '../posts/Walk1';

const blogRoutes = [
  {
    path: "/a-walk-through-unfamiliar-science-part-1",
    element: <BlogTemplate title={meta1.title} date={meta1.date}><Walk1 /></BlogTemplate>,
  }
];

export default blogRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />);
