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
      <h1> A walk through unfamiliar science, part 1 </h1>
      <h2> <i> Updated 2025-06-01 </i> </h2>
        <p>

Due to the nature of my profession, sometimes I have to work on code in a scientific field far from where I come from. Sometimes, I also do this to keep my mind occupied; recently, I have been looking at a few papers applying control theory to biological systems. For example, [2] deals with time-optimal controls in epidemiology, where the authors pose the question: how can we reduce the length of epidemics by exerting our control at the exact right times? As usual, at first, I did not understand these papers. It can be challenging to explore so far from what we were trained to do, but there are a few tricks. The first is to maintain a foundation in probability theory, calculus, algorithms, and so on. As an engineer, I am not a master of these subjects, but I keep enough of it with me to allow me to make progress when I want to learn something and apply it in practice. <br/> <br/>

As an aside, I have always been a person with wide (or unfocused) interests. As a student, without the proper foundations, I spent a long time trying to learn classical and statistical mechanics in order to understand the dynamics of proteins (to that end, video lectures by Leonard Susskind are great). I was quite jealous of physicist friends at the time, often trying to steer my career toward biophysics. In part I suspect this was a kind of immaturity an elitism. With hindsight, it's easy to open up a paper on, for example, immunology, and realise that there is talent and complexity everywhere. We don't do well enough to appreciate diverse talents, which can be found absolutely everywhere in society. It's good to try to break down elitism. <br/> <br/>

The first "trick" is not really a trick, but a long term commitment to problem solving. On the other hand, the second trick is closer to one, practiced frequently in software engineering: <i> abstraction</i>. This is the process whereby we take complexity, and hide it in a box, so that we can reason about bigger and bigger systems. I strongly recommend that, when learning anything, we attempt to hide as much detail as possible. In mathematics, there is a lot of complexity that I cannot store as an engineer. Building intuition with less formality, and what might be described as "hand waving", is crucial. It is a great exercise to attempt to compress complex subjects down into something simple. <br/> <br/>

Here, I'm going to explore the calculus of variations and optimal control. At the beginning of this, I know nothing of optimal control, and only a bit about functionals. I'm going to try to learn this through explaining it in as simple terms as possible, assuming some basic knowledge of calculus. For a proper reference, see [1]. This text is the opposite: thorough and heavy on the math notation. In mathematics like this, there are usually detailed conditions over what formula applies in what cases. This is important in practice, but not so much for the explainer, so I will handwave it away wherever I can.

        </p>
        <h2> Stationary action and shortest paths </h2>
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
            Next, we imagine the stationary path. What is the maximum or minimum path? Taking inspiration from regular calculus we know that for a function, the extreme points are those where the derivative is zero. For a vector, the extreme values are those where the gradient vector is zero. What about a continuous path? We can imagine this a bit like a vector of uncountable number of points. So, we take our unknown function, and add a small amount of another arbitrary function (differentiable, zero at the endpoints).
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
            which is most of the work. The term linear in epsilon is referred to as the second definition of the 'variation' [1]. If it helps, to see the similarity to the definition of a derivative using limits, rearrange a bit:
            <MathJax>
              {`$$
                 \\frac{S[y + \\epsilon\\eta] - S[y]}{\\epsilon} = \\int_a^b \\frac{y'\\eta'}{\\sqrt{1+y'^2}} dx + O(\\epsilon)
              $$`}
            </MathJax>
            When epsilon goes to zero, we expect to be zero on the RHS. This is the usual procedure. With a bit of work and attention to detail (which I probably lack for this), we can show that y needs to be constant. I will leave this calculus to the reader. <br/><br/>

         As it happens, it's possible to derive a more broad rule that allows us to avoid this analysis: the Euler-Lagrange equation. Given a functional with integrand (Lagrangian) of the form:
        </p>
        <p>
            <MathJax inline>{
                "\\( S[y] = \\int L(y, y', x) dx\\)"
            }</MathJax>
        </p>
        <p>
            Then:
        </p>
        <p>
            <MathJax inline>{
                "\\( \\frac{\\partial L}{\\partial y'} - \\frac{d}{dx} \\frac{\\partial L}{\\partial y} = 0\\)"
            }</MathJax> <br/><br/>
            I don't prove this as it's a bit long. Sometimes, we have to take things on faith. Usually I will do so for well-known formulae with easy to understand conditions. The EL equation is foundational, widely used, and named after Euler & Lagrange, so I just accept it as fact. Plugging in the arc length here, for example, we get: <br/><br/>
            <MathJax>
              {`$$
                \\begin{align}
                & \\frac{d}{dx}\\frac{y'}{\\sqrt{1+y'^2}} = 0 \\\\
                & \\rightarrow y' = a\\sqrt{1+y'^2} \\\\
                & \\rightarrow y' = a/(1-a^2) \\\\
                & \\rightarrow y = mx + c
                \\end{align}
              $$`}
            </MathJax>
            Now, I haven't shown whether this is a minimum, maximum, or saddle point. Like in regular calculus, this can also be found by looking at the second "variation". But we don't need to look at those details to understand the concepts, so we won't.
        </p>
        <h2> Another example: maximum "entropy" distribution </h2>
        <p>
            What about the path for which "entropy" (I use quotations because entropy is discrete) is maximized? Pretend for a moment it is continuous. We have the constraint (ignoring the domain for now): <br/><br/>
            <MathJax inline>{
                "\\( \\int f(x) dx = 1\\)"
            }</MathJax> <br/> <br/>
            These kinds of constraints, along with the integral optimization problem, are referred to as 'isoperimetric' [1], and generally involve modifying the integral a bit using Lagrange multipliers in the functional, like: <br/><br/>
            <MathJax>
              {`$$
                \\begin{align}
                 S[f] & = \\int f(x)\\log(f(x))dx + \\lambda\\Big(1-\\int f(x) dx\\Big)\\\\
                 & = \\lambda - \\int f(x)\\log(f(x)) + \\lambda f(x) dx
                \\end{align}
              $$`}
            </MathJax>
            Hopefully it's possible to see that adding any multiple of one minus the integrated probability is the same as adding zero, so leaves the action unchanged. I don't really explain why we do this, or how exactly this enforces the constraint, but maximizing or minimizing the resulting functional is still the same process. Personally, I accept this method again because it is directly comparable to the use of Lagrange multipliers from calculus, so is again not overly obscure. Note that the left side of the integrand is the usual definition of expected self-information. Applying the E-L equation: <br/><br/>
            <MathJax>
              {`$$
                \\log(f(x)) + 1 + \\lambda = 0 \\rightarrow f(x) = \\exp\\{-(1+\\lambda)\\} = const
              $$`}
            </MathJax>
            This constant depends on the domain of f. So we have shown that the extremum of entropy is in fact a uniform distribution.
        </p>
        <p>
            Hopefully it's possible to see how useful this method can be in general. Traditionally it has been used to derive paths in mechanical systems. For example, we might want to know the position of a spring as a function of t in an oscillating system. As it turns out, this approach is often easier than traditional inspection of forces, especially when we start examining systems with constraints or different coordinate systems.
        </p>
        <p>
            As an additional note, we saw how integral constraints could be introduced above, and the standard method of using Lagrange multipliers. We can do the same for constraints of the form:
            <MathJax>
              {`$$
                \\begin{align}
                 S[f] & = \\int L(f, f', t) dt \\\\
                 f' &= v(t)
                \\end{align}
              $$`}
            </MathJax>

            This is very similar situation to the integral constraint, with a small difference. The equation f'(t) - v(t) = 0 holds for any arbitrary t. In the previous example, t did not feature in the constraint equation (only in the integral on one side). Now, it seems to me that the following is true:

            <MathJax>
              {`$$
                \\begin{align}
                 \\int L(f, f', t) dt & = \\int L(f, f', t) dt + \\lambda \\int (f' - v) dt \\\\
                      & = \\int L(f, f', t) dt + \\int \\lambda(t) (f' - v) dt \\\\
                \\end{align}
              $$`}
            </MathJax>

            The second equation seems to be, in some sense, a stronger statement than the first. For any lambda(t) within reason, the RHS is zero. It can be a constant or any other function of t, since it is multiplied by zero. This leads us to:

            <MathJax>
              {`$$
                \\begin{align}
                 \\overline{S}[f] & = \\int L(f, f', t) dt  = \\int L(f, f', t) + \\lambda(t) (f' - v) dt \\\\
                \\end{align}
              $$`}
            </MathJax>
            
            For which, again, we can apply the EL equation. 

        </p>
        <h2> The Hamiltonian </h2>
        <p>
            There's a very similar formulation from Hamiltonian mechanics that involves moving to a different coordinate system called _phase_space_. This is a coordinate change; instead of thinking about position and velocity, we instead consider position and "momentum". Assume that we define:

            <MathJax>
              {`$$
                \\begin{align}
                p_i & = \\frac{\\partial L}{\\partial q_i'}\\\\
                H & = \\sum_i p_i q'_i - L
                \\end{align}
              $$`}
            </MathJax>
            
            We can move to describing a _phase_space_, with coordinates described by positions and momenta, (q_i, p_i). The usual description in terms of position, velocity, time, is the configuration space. Changing spaces, we have an action analogous to previous one. We can see from the definition of H that:

            <MathJax>
              {`$$
                \\begin{align}
                S = \\int L(q, q', t) dt  = \\int (p_i q_i' - H(q_i, p_i, t)) dt
                \\end{align}
              $$`}
            </MathJax>

            We can also see, from the EL equations and definition of H:

            <MathJax>
              {`$$
                \\begin{align}
                \\frac{\\partial L}{\\partial q} & = \\frac{d}{dt}\\frac{\\partial L}{\\partial q'} \\\\
                \\rightarrow \\frac{\\partial L}{\\partial q} & = \\frac{dp}{dt} \\\\    
                \\rightarrow -\\frac{\\partial H}{\\partial q} & = \\frac{dp}{dt}
                \\end{align}
              $$`}
            </MathJax>
       
            and

            <MathJax>
              {`$$
                \\begin{align}
                L(q, q', t) + H(p, q) & = pq' \\\\
                \\rightarrow \\frac{\\partial}{\\partial p} (L + H) & = q' \\\\
                \\rightarrow \\frac{\\partial H}{\\partial p} & = q' \\\\
                \\end{align}
              $$`}
            </MathJax>
            
            Which are referred to as Hamilton's equations. These equations are just a coordinate change for the EL equations; although this seems complex, there is no magic. Specifically, it's referred to as a Legendre transform. Both sets of equations are correct and equivalent. In fact, if the reader is familiar with differential equations, it is a standard technique to transform a second order equation into two first order equations. Either can be solved, and will produce equivalent solutions. Notice that, although we now have two equations, in total they are of reduced order:

            <MathJax>
              {`$$
                \\begin{align}
                p' & = -\\frac{\\partial H}{\\partial q} \\\\
                q' & = \\frac{\\partial H}{\\partial p} \\\\
                \\end{align}
              $$`}
            </MathJax>

            Lastly, the Hamiltonian action is simply the regular action with the substitution (this will be important later):

            <MathJax>
              {`$$
                \\begin{align}
                S = \\int L dt = \\int pq' - L dt
                \\end{align}
              $$`}
            </MathJax>

        </p>

        <h2> Pontryagin's maximum principle </h2>
        
        <p>
        Unfortunately, we're close, but we're not out of the woods yet. There is another layer to this still (althouogh in this case, Wikipedia has a relatively easy summary [3]). Let's say we have a usual functional, and some quantity x(t) which we take to be a path in the usual sense. Previously, we were looking for the path that maximised or minimised something over the course of that path. This time, let's say we also have some quantity u(t), which we refer to as a control variable. Perhaps this can be an intervention, or controls for a vehicle. We have a slightly new problem:

            <MathJax>
              {`$$
                S[x, u] = \\Psi(x(t)) + \\int_0^T L(x(t), u(t)) \\, dt \\\\
              $$`}
            </MathJax>

            <MathJax>
              {`$$
                x'(t) = f(x, u)
              $$`}
            </MathJax>

            We also specify:

            <MathJax>
              {`$$
                u(t) \\in U
              $$`}
            </MathJax>
            
            Which just means that the path has to take values from some set of valid controls. Now, fortunately we built some intuition for constraints already. At this point, Wikipedia defines the Pontryagin Hamiltonian:

            <MathJax>
              {`$$
                H = \\lambda f + L
              $$`}
            </MathJax>

            This looks a bit like the Hamiltonian pq - L, with lambda in place p, but there is a difference in sign. This is a bit confusing, but we can spot a pattern. Recall:

            <MathJax>
              {`$$
                S = \\int L dt = \\int pq - H dt
              $$`}
            </MathJax>

            But with our constrained equation:

            <MathJax>
              {`$$\\begin{split}
                \\overline{S} & = \\int L + \\lambda(t)(f - x) dt \\\\
                & = - \\int \\lambda(t)x' - (L + \\lambda(t)f) dt \\\\
                & = - \\int \\lambda(t)x' - H dt
              \\end{split}$$`}
            </MathJax>

            Which gives the negative of the Hamiltonian action, featuring a slightly different form for H. This difference in sign, between H = pq - L and H = pq + L, turns out not to matter. By looking above, we can see that the action is negated. But we are attempting to extremize a functional, so I would guess it doesn't matter if we are minimizing or maximizing the negative.

            Applying Hamilton's equations, we get:

            <MathJax>
              {`$$ \\begin{split}
                - \\lambda' & = \\partial_x \\overline H = \\lambda(t) \\partial_x f(x, u) + \\partial_x L \\\\
                x' & = \\partial_\\lambda \\overline G =  f(x, u) \\\\
              \\end{split} $$`}
            </MathJax>
            
            The first of which happens to be one of three conditions for optimal control, and the second is just our constraint. There are two more conditions, although in this case, I cannot make a connection to something from earlier. Sometimes, we have to go on trust. The next condition is that for the optimal control, our Hamiltonian must be pointwise minimal for all t and u. This seems surprising to me, as it seems to imply the global optimal control is also the local one. 

            <MathJax>
              {`$$ \\begin{split}
                \\overline{G}(x^*, u^*, \\lambda^*, t) <= \\overline{G}(x, u, \\lambda, t)
              \\end{split} $$`}
            </MathJax>

            Lastly:

            <MathJax>
              {`$$ \\begin{split}
                \\lambda(T) = \\partial_x \\Psi (x(T))
              \\end{split} $$`}
            </MathJax>

            Which emerges from the full functional, integrating by parts:

            <MathJax>
              {`$$ \\begin{split}
                \\overline{S} & = \\int L + \\lambda(t)(x' - f) dt \\\\
                  & = \\int L - \\lambda f dt + \\int \\lambda(t) x' dt \\\\
                  & = \\int L - \\lambda f  - \\lambda'x dt + \\lambda x|_0^T\\\\
              \\end{split} $$`}
            </MathJax>

            Now, if we want this functional to be equivalent to our original stated problem, we need:

            <MathJax>
              {`$$ \\begin{split}
                  \\Psi(x(T)) & = \\lambda x|_0^T\\\\
                  \\partial_x \\Psi(x(T)) = \\lambda(T) \\
              \\end{split} $$`}
            </MathJax>


        </p>
        
        <h2> References </h2>
        <ul>
            <li> Polyanin, A.D. and Manzhirov, A.V., 2006. Handbook of mathematics for engineers and scientists. Chapman and Hall/CRC. </li>
            <li> Bolzoni, L., Bonacini, E., Soresina, C. and Groppi, M., 2017. Time-optimal control strategies in SIR epidemic models. Mathematical biosciences, 292, pp.86-96. </li>
            <li> https://en.wikipedia.org/wiki/Pontryagin%27s_maximum_principle </li>
        </ul>
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

