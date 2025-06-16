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
        <p> This page is an entry in my blog on science I find interesting. When starting a new scientific software project as a hobby, usually I have to figure out something that might be considered advanced. Sometimes, advanced concepts have a simple interpretation when viewed from a particular angle. This post is a minimalist description along those lines. Use these pages for simple intuition or interest but not reference. For that, use a textbook or paper. </p>
        <div>{children}</div>
      </div>
    </div>
    </MathJaxContext>
  );
}
