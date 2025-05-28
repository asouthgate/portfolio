import { React, useState } from 'react';
import { getEvent } from '../api/requests'
import rainCloud from '../assets/raincloud.png';
import resistanceMap from '../assets/resistance-drawings.png';
import cogUK from '../assets/cog-uk.png';
import BlackHoleInner from '../assets/blackhole-inner.png';
import BlackHoleOuter from '../assets/blackhole-outer.png';
import climbPaper from '../assets/climb-paper.png';
import {FloatEffect, SpinEffect} from '../Effects';
import './common.css' // change this to common
import './projects.css'

import { MathJaxContext, MathJax } from 'better-react-mathjax';

const config = {
  loader: { load: ["[tex]/ams"] },
  tex: { packages: { "[+]": ["ams"] } }
};

const TestEntry = () => {
  return (
    <MathJaxContext config={config}>
    <div className="row gravwave-projects project">
      <div className='col-12 col-md-12'>
      <h1> 2025-05-26: Calculus of variations</h1>
        <p>
            I recently read an interesting paper about discrete systems, such as protein repertoires, inspired by statistical physics. I'll admit, I didn't understand it completely, which is partly why I was interested in taking a look. It covered a range of my interests, from biological sequences, to software engineering, to one of my favourite subjects in mathematics: the calculus of variations. When I studied biochemistry, I was always trying to stray as far as I could into the physics, from X-ray crystallography to the classical mechanics and thermodynamics required to understand protein dynamics (although I didn't get very far with quantum mechanics). As a software engineer, I am a fan of abstraction, and wanted to write a post explaining the calculus of variations hiding as much complexity as possible.
        </p>
        <h2> Stationary action </h2>
        <p>
            In the calculus of variations, we begin with a principle: stationary action. This is a bit obscure, but it is essentially about finding the path between two points that minimizes something. If we were walking from A to B on a mountain range, we might want to find the path that minimizes our exhaustion. Or, if we were on a flat plane, we might even ask what's the shortest path between two points? Fairly obviously, this is a straight line, and presumably this was proved before the calculus of variations. Still, it can be a good example to demonstrate.
        </p>
        <p>
            We start by defining the integral over a given path of the arc length. This gives the total length for any path. We don't actually know what the function y is here that maximises this integral. Firstly, remember:
            <MathJax>
              {`$$
                \\begin{align}
                \\Delta z^2 &= \\Delta x^2 + \\Delta y^2\\\\
                \\end{align}
              $$`}
            </MathJax> 
        </p>
        <p>
            By ignoring the complexities of integrals, we can roughly see why the integral for the total length is:
            <MathJax>
              {`$$
                    S[y] = \\int_a^b \\sqrt{1+y'^2} dx 
              $$`}
            </MathJax>
        </p>
        <p>
            Next, we imagine the stationary path. What is the maximum or minimum path? Taking inspiration from regular calculus we know that for a function, the extreme points are those where the derivative is zero. For a vector, the extreme values are those where the gradient vector is zero. What about a continuous path? We can imagine this a bit like a vector of uncountable number of points. So, we take our unknown function, and add a small amount of another arbitrary function (continuous, nonzero, zero at the endpoints). This function is adding a 'variation'.
            <MathJax>
              {`$$
                S[y + \\epsilon \\eta] = \\int_a^b \\sqrt{1+(y + \\epsilon \\eta)'^2} dx
              $$`}
            </MathJax>
            Next, with a Taylor expansion, we get:
            <MathJax>
              {`$$
                S[y + \\epsilon\\eta] - S[y] =  \\epsilon\\int_a^b \\frac{y'\\eta'}{\\sqrt{1+y'^2}} dx + O(\\epsilon ^2)
              $$`}
            </MathJax>
            which is most of the work. If it helps, to see the similarity to the definition of a derivative using limits, we can see the similarity here:
            <MathJax>
              {`$$
                 \\frac{\\delta S}{\\epsilon} = \\int_a^b \\frac{y'\\eta'}{\\sqrt{1+y'^2}} dx + O(\\epsilon)
              $$`}
            </MathJax>
            When epsilon goes to zero, we expect to be zero on the RHS. This is the usual procedure. With a bit of work and attention to detail (which I probably lack for this), we can show that y needs to be constant. I will leave this calculus to the reader. As it happens, it's possible to derive a more broad rule that allows us to avoid this analysis: the Euler-Lagrange equation. Given a functional with integrand (Lagrangian) of the form:
        </p>
        <p>
            <MathJax inline>{
                "\\( S[y] = \\int L(y, y', x) dx\\)"
            }</MathJax>
        </p>
        <p>
            Then (not shown):
        </p>
        <p>
            <MathJax inline>{
                "\\( \\frac{\\partial L}{\\partial y'} - \\frac{d}{dx} \\frac{\\partial L}{\\partial y} = 0\\)"
            }</MathJax> <br/><br/>
            Plugging in the arc length here, for example, we get: <br/><br/>
            <MathJax>
              {`$$
                \\begin{align}
                & \\frac{d}{dx}\\frac{y'}{\\sqrt{1+y'^2}} = 0 \\\\
                & \\rightarrow y' = a\\sqrt{1+y'^2} \\\\
                & \\rightarrow y'^2(1-a^2) = a \\\\
                & \\rightarrow y' = a/(1-a^2) \\\\
                & \\rightarrow y = mx + c
                \\end{align}
              $$`}
            </MathJax>

        </p>
        <h2> An example: maximum "entropy" distribution </h2>
        <p>
            What about the path for which "entropy" (I use quotations because entropy is discrete) is maximized? Pretend for a moment it is continuous. We have the constraint (ignoring the domain for now): <br/><br/>
            <MathJax inline>{
                "\\( \\int f(x) dx = 1\\)"
            }</MathJax> <br/> <br/>
            So we use a Lagrange multiplier in the functional: <br/><br/>
            <MathJax>
              {`$$
                \\begin{align}
                 L[f] & = \\int f(x)\\log(f(x)) + \\lambda\\Big((1-\\int f(x) dx\\Big)\\\\
                 & = \\lambda - \\int f(x)\\log(f(x)) + \\lambda f(x) dx
                \\end{align}
              $$`}
            </MathJax>
            Note that the left side of the integrand is the usual definition of expected self-information. Applying the E-L equation: <br/><br/>
            <MathJax inline>{
                "\\( \\log(f(x)) + 1 + \\lambda = 0 \\rightarrow f(x) = \\exp\\{-(1+\\lambda)\\} = const \\)"
            }</MathJax>
            This constant depends on the domain of f.
        </p>
        <p>
            Hopefully it's possible to see how useful this method can be in general. Traditionally it has been used to derive paths in mechanical systems. For example, we might want to know the position of a spring as a function of t in an oscillating system. As it turns out, this approach is often easier than traditional inspection of forces, especially when we start examining systems with constraints or different coordinate systems. But the principle is also more general. In my next post I will explore how this could be applied to models of biological systems.
        </p>
      </div>
      <div className='col-6 col-md-6'>
      </div>
    </div>
    </MathJaxContext>
  );
};




const Blog = () => {

  return (
    <div className="container home-container">
        <TestEntry/>
    </div>
  );
};

export default Blog;

