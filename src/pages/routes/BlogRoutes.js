import { Route } from 'react-router-dom';
import BlogTemplate from '../blog/BlogTemplate';

import Vulkan1, { metadata as meta1 } from '../posts/Vulkan1';
import Walk1, { metadata as meta2 } from '../posts/Walk1';
import Sph1, { metadata as meta3 } from '../posts/Sph1';

const blogRoutes = [
  {
    path: "/a-walk-through-unfamiliar-science-part-1",
    element: <BlogTemplate title={meta1.title} date={meta1.date}><Walk1 /></BlogTemplate>,
  },
  {
    path: "/smoothed-particle-hydrodynamics",
    element: <BlogTemplate title={meta1.title} date={meta1.date}><Sph1 /></BlogTemplate>,
  },
  {
    path: "/vulkan-gpu-mini-cluster",
    element: <BlogTemplate title={meta1.title} date={meta1.date}><Vulkan1 /></BlogTemplate>,
  }
];

export default blogRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />);
