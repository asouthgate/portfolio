import { MathJaxContext, MathJax } from 'better-react-mathjax';
import oilImg from '../../assets/oil.png';


export const metadata = {
  title: "Blog1 Foo",
  date: "June 8, 2025"
};

export default function Sph1() {
  return (
    <div>
      <h1> Smoothed particle hydrodynamics </h1>
      <h2> <i> Updated 2025-06-16 </i> </h2>
      <h3> Four features of realistic flows </h3>
      <p>
            This post is about smoothed particle hydrodynamics, a technique from astrophysics [1] [this paper has been cited over 10k times]. In order to understand the method, I want to start somewhere else, by asking what features make a realistic fluid simulation. There is a lot of complexity in this subject, but I believe that most people have an intuition for the behaviour of fluids. <br/><br/>

            For a flowing river with a fixed coordinate axis, any point in the body of the water will have some current passing through, captured by a velocity v(x, t). The traditional method for simulating this function is "computational fluid dynamics" (CFD). In CFD, the continuous fluid is approximated by a grid of finite points.

            <MathJax>
              {`$$
                (x_i, t_k) \\mapsto v(x_i, t_k)
              $$`}
            </MathJax>

            If v were a constant vector in some direction, there would be constant flow. If it were some constant vector multiplied by time, it would be a unidirectional flow that grows linearly in strength. It could be any wacky function and correspond to some alien system. But what kind of mapping will result in something that looks real? A lot of realism can be captured by "conservation", "continuity", Newton's laws, and thermodynamic pressure. <br/><br/>

        Mass is conserved. If you bake a cake, the cake cannot weigh more than the ingredients you put in (it can weigh a bit less if some gas escapes). You can slice the cake any way, and the sum of the pieces will weigh the same as the whole. For a simulated fluid, mass and momentum should be conserved.

            <MathJax>
              {`$$
                \\Delta q = \\sum_i q(x_i, t_{k + 1}) - q(x_i, t_k) = S - V
              $$`}
            </MathJax>
    
        Continuity means that _teleportation_is_impossible_. If a river becomes narrow, fluid must flow through the narrow region, and cannot teleport through. Conservation does not preclude teleportation, but continuity does. For a grid, exchange of mass or momentum must occur at the faces between cells:

            <MathJax>
              {`$$
                \\Delta_k q_i = \\sum_{j\\in nbrs(i)} \\Delta_k q_{ij}
              $$`}
            </MathJax>

      where q_ij is the net amount of quantity exchanged between i and j in a small time step. It just means that for a very small time interval, the amount of something lost or gained must be the amount transferred via neighbors. For a large time interval, this is not true. <br/><br/>

      We don't need much more to get a system that behaves like a fluid. What's necessary can be seen in the 'momentum equation':

            <MathJax>
              {`$$
                \\Delta_k (\\rho_i v_i) = \\sum_{j\\in nbrs(i)} \\Big[f(i, j) + g(i,j) + h(i, j) \\Big] \\Delta t_k
              $$`}
            </MathJax>

      The first term, f, is the momentum flux. What is this? Fluid itself carries momentum, it is one of the quantities we model moving between cells. A giant wave carries a lot of momentum. This term captures advection, and is proportional to the difference in velocity between neighbors. <br/><br/>

    The second term is less intuitive, representing a force in the plane of the face. This is 'shearing', and is the basis of viscosity in fluids. It causes velocity to diffuse out as the fluid drags itself around the place. For highly viscous fluids, this is more obvious. <br/><br/>

    The final component is something I find interesting. In a system that begins with only velocity in one direction, say along the x axis, advection and viscosity can cause velocity to spread around and exchange between cells, but velocity in the y axis will always be zero. Mathematically, if I recall correctly, without pressure force the velocity field will be irrotational; there will be no circulation, whirls, vortexes, or anything interesting. This final contribution, h, is also our connection to thermodynamics. It's actually the negative spatial gradient of the pressure. As fluid flows into a region, the pressure will build, causing a force that pushes in all directions. If we start with only x velocity, pressure will build and become x and y velocity. <br/><br/>
    
    If this is developed a bit further, we can arrive at the Navier-Stokes equations. But it's a bit too complicated for me & this blog. <br/><br/>

      To summarise, if we want to simulate a decent looking fluid:
      <ul>
        <li> Continuity gives us rules for moving quantities between neighboring points on a finite grid; we can think locally (incompressible flows excepted). </li>
        <li> Advection gives us the 'core' of unidirectional flow, orthogonal to faces between neighbors on the grid. </li>
        <li> Viscosity gives us diffusion of momentum, allowing the fluid to drag itself around (think bulk cohesion of water molecules). </li>
        <li> Finally, pressure allows velocity in one dimension to be transmitted to velocity in other dimensions, giving rotation. </li>
      </ul>

      </p>

      <h3> Smoothed particles </h3>
        
      <p>
        In SPH, the situation is similar, except for the fact there is no longer a fixed grid. Instead, a finite set of particles serve as dynamic grid points. When we want to know the value of any quantity at time t, we average over nearby particles. The particles themselves are not water molecules, but points that flow along with the fluid that we use to interpolate our quantities of interest. <br/><br/>

        A crucial component of this is that we use some _kernel_ function to do our interpolation. This is a function like a probability density function, and integrates to one [1]. Any quantity is then averaged over other particles (see [1] or <a href="https://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics"> Wikipedia </a> for some details):

        <MathJax>
          {`$$
            \\hat q(x) = \\int q(y) W(|y-x|) dV(y) \\approx \\sum_{j \\in particles} V_j^t q_j^t W(|y_j - x|)
          $$`}
        </MathJax>

    It's just averaging or interpolation. If the chosen kernel is "compact" (zero outside of a finite region), only local information is required to compute the average. Just like before, we have a few quantities, including velocity, density, and pressure. How do we deal with them?

      <ul>
        <li> Continuity doesn't really feature anymore. In a similar-ish way, with a compact kernel we require only local information when updating particle quantities. </li>
        <li> Advection this time comes for free, given that the particles themselves are simulated classically & move around. </li>
        <li> Viscosity, giving diffusion of momentum, this time is a bit more complex or fuzzy. We use a diffusive function called 'artificial viscosity' to compute viscous forces at a particular time. It's just a fudge, at the end of the day. </li>
        <li> Finally, we have pressure, like before, which is also a quantity carried by the particles. The simplest method for this involves computing it as a function of particle densities, as an equation of state. </li>
      </ul>

    All we have to do in our main loop is compute density, forces, and pressure. We then apply the forces using a leapfrog integrator. SPH has some advantages and disadvantages when compared to CFD. Firstly, it's much better at simulating moving bodies and fluid interfaces, such as a droplet in air. On the other hand, it's also considered less realistic. 

      </p>

      <h3> A quick note on conservation of momentum </h3>
      <p>
      Conservation was mentioned a lot in the first part of this post. I don't really mention it in the second, but in order to get a system in which momentum is conserved, we do need our rules to have a particular form. In a previous blog post I talked about functionals and the principle of least action. As it happens, if a particular Lagrangian is taken in the context of SPH particles, the momentum equation that is typically used can be derived. I won't reproduce it here, but the <a href="https://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics"> Wikipedia article </a> has a good description.
      </p>
      <h3> Application to biological simulations. </h3>
      <p>
      I used this method to simulate a fluid with two phases (like oil and water), which will be crucial for simulating biological systems of the kind I am interested in. This isn't many particles, and was rendered in real time to allow interactivity. I will be dropping real-time graphics moving forward, at least for now, and move to the GPU so that we can hopefully increase the number of particles by an order of magnitude. After that, I will introduce more interesting dynamics. <br/>
          <img src={oilImg} alt="Left: A picture of a droplet of oil & water mixed together, about to fall. Middle: droplet, after crashing. Right: fluid beginning to settle in two layers"   style={{
    display: 'block',
    margin: '0 auto',
    height: 'auto'
  }} />
      </p>

      <h2>References</h2>
      <ul>
        <li> Gingold, R. A., & Monaghan, J. J. (1977). Smoothed particle hydrodynamics: theory and application to non-spherical stars. Monthly notices of the royal astronomical society, 181(3), 375-389. </li>
      </ul>

    </div>
  );
};
