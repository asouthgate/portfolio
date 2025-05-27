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
      <h1> 2025-05-26: Calculus of variations and Shannon entropy</h1>
        <p>
            I recently read an interesting paper about discrete systems, such as protein repertoires, inspired by statistical physics. I'll admit, I didn't understand it completely, which is partly why I was interested in taking a look. It covered a range of my interests, from biological sequences, to software engineering, to one of my favourite subjects in mathematics: the calculus of variations. Despite it being one of my favourite subjects, I am not a mathematician, and never spent much time on it. In addition, I was always very jealous of physicists! When I studied biochemistry, I was always trying to stray as far as I could into the mathematical, from X-ray crystallography to the classical mechanics and thermodynamics required to understand protein models. I never tried to get very far into quantum mechanics beyond year one physics. Anyway, eventually I did get around to learning this.
        </p>
        <h2> Stationary action </h2>
        <p>
            In the calculus of variations, we begin with a principle: stationary action. This is a bit obscure, but it is essentially about finding the path between two points that minimizes something. If we were walking from A to B on a mountain we might want to find the path that minimizes our exhaustion. Or, if we were on a flat plane, we might even ask what's the shortest path between two points? Fairly obviously, this is a straight line, and presumably this was proved before the calculus of variations. Still, it can be a good example to demonstrate.
        </p>
        <p>
            We start by defining the integral over a given path of the arc length. This gives the total length for any path. We don't actually know what the function y is here that maximises this integral. 
        </p>
        <p>
            <MathJax inline>{
                "\\( S[y] = \\int_a^b \\sqrt{1+y'^2} dx \\)"
            }</MathJax>
        </p>
        <p>
            Next, we imagine the stationary path. What is the maximum or minimum path? Taking inspiration from regular calculus we know that for a function, the extreme points are those where the derivative is zero. For a vector, the extreme values are those where the gradient vector is zero. What about a continuous path? We can imagine this a bit like a vector of uncountable number of points. So, we take our unknown function, and add a small amount of another arbitrary function (continuous, nonzero, zero at the endpoints). This function is adding a 'variation'.
        </p>
        <p>
            <MathJax inline>{
                "\\( S[y + \\epsilon \\eta] = \\int_a^b \\sqrt{1+(y + \\epsilon \\eta)'^2} dx \\)"
            }</MathJax>
        </p>
        <p>
            Next, Taylor expand to get:
        </p>
        <p>
            <MathJax inline>{
                "\\( S[y + \\epsilon\\eta] - S[y] =  \\epsilon\\int_a^b \\frac{y'\\eta'}{\\sqrt{1+y'^2}} dx + O(\\epsilon ^2) \\)"
            }</MathJax>
        </p>
        <p>
            <MathJax inline>{
                "\\( \\frac{\\delta S}{\\epsilon} = \\int_a^b \\frac{y'\\eta'}{\\sqrt{1+y'^2}} dx + O(\\epsilon) \\)"
            }</MathJax>
        </p>
        <p>
            When epsilon goes to zero, we expect to be zero on the RHS. This is the usual procedure. With a bit of work, not shown here, we can show only a straight line statisfies this condition. For a hint, note that the denominator in the fraction is positive for real path, and the variation is a continuous function, zero at both start ane dn, and therefore bounded.
        </p>
        <h2> Euler-Lagrange equation </h2>
        <p>
            Using this kind of method, you can derive the Euler-Lagrange equation. Given a functional with integrand (Lagrangian) of the form:
        </p>
        <p>
            <MathJax inline>{
                "\\( S[y] = \\int L(f, f', x) dx\\)"
            }</MathJax>
        </p>
        <p>
            Then (not shown):
        </p>
        <p>
            <MathJax inline>{
                "\\( \\frac{\\partial L}{\\partial f'} - \\frac{d}{dx} \\frac{\\partial L}{\\partial f} = 0\\)"
            }</MathJax> <br/><br/>
            Plugging in the arc length here, for example, we get: <br/><br/>
            <MathJax inline>{
                "\\( \\frac{d}{dx}\\frac{f'}{\\sqrt{1+f'^2}} = 0 \\rightarrow f' = a\\sqrt{1+f'^2} \\rightarrow f'^2(1-a^2) = a \\rightarrow f' = const \\rightarrow f = mx + c\\)"
            }</MathJax> <br/>
        </p>
        <h2> Entropy </h2>
        <p>
            What about the path for which Entropy is maximized? Pretend for a moment it is continuous. We have the constraint: <br/><br/>
            <MathJax inline>{
                "\\( \\int f(x) dx = 1\\)"
            }</MathJax> <br/> <br/>
            So we use a Lagrange multiplier in the functional: <br/><br/>
            <MathJax inline>{
                "\\( S[y] = \\int -f(x)\\log(f(x)) + \\lambda f(x) dx\\)"
            }</MathJax> <br/> <br/>
            Note that the left side of the integrand is the usual definition of expected self-information. Applying the E-L equation: <br/><br/>
            <MathJax inline>{
                "\\( -\\log(f(x)) - 1 + \\lambda = 0 \\rightarrow f(x) = \\exp\\{1+\\lambda\\} = const \\)"
            }</MathJax>
        </p>
        <h2> Maxwell-Boltzmann </h2>
        <p>
            A very similar thing is done to derive the distribution of velocities in a gas under the assumption of maximum entropy.
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

