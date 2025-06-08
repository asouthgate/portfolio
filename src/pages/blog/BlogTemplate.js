import React from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const config = {
  loader: { load: ["[tex]/ams"] },
  tex: { packages: { "[+]": ["ams"] } }
};


export default function BlogTemplate({ title, date, children }) {
  return (
    <MathJaxContext config={config}>
    <div className="row gravwave-projects project">
      <div className='col-12 col-md-12'>
        <div>{children}</div>
      </div>
    </div>
    </MathJaxContext>
  );
}
