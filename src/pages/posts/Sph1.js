import { MathJaxContext, MathJax } from 'better-react-mathjax';

export const metadata = {
  title: "Blog1 Foo",
  date: "June 8, 2025"
};

export default function Sph1() {
  return (
    <div>
      <h1> Smoothed particle hydrodynamics </h1>
      <h2> <i> Updated 2025-06-16 </i> </h2>
      <h3> The basis for fluid simulation: 4 concepts </h3>
      <p>
            Consider a flowing river with a fixed coordinate axis. Any point in the body of water will have some current passing through, captured by a velocity v(x, t). How can we simulate flow? The traditional method for simulating fluids is "computational fluid dynamics" (CFD). In CFD, the continuous fluid is approximated by a grid of finite points. CFD is too complex for this post and takes many years to study. Instead, let's ask: how do we simulate a realistic-looking fluid?

            <MathJax>
              {`$$
                (x_i, t_k) \\mapsto v(x_i, t_k)
              $$`}
            </MathJax>

            If v were a constant vector in some direction, we would have a constant flow. If it were some constant vector multiplied by time, it would be a unidirectional flow that grows linearly in strength. It could be any wacky function and correspond to some alien system. But what kind of mapping will result in something that looks real? A lot of realism can be captured by "conservation", "continuity", Newton's laws, and thermodynamic pressure. <br/><br/>

        Mass is conserved. If you bake a cake, the cake cannot weigh more than the ingredients you put in (it can weigh a bit less if some gas escapes). You can slice the cake any way, and the sum of the pieces will weigh the same as the whole. For a simulated fluid, mass and momentum should be conserved like in regular physics.

            <MathJax>
              {`$$
                \\Delta q = \\sum_i q(x_i, t_{k + 1}) - q(x_i, t_k) = S - V
              $$`}
            </MathJax>
    
        Continuity basically just means that _teleportation_is_impossible_. If a river flows into a very narrow region, fluid must flow through the narrow region, and cannot teleport through. Conservation does not preclude teleportation, but continuity does. For a grid, exchange of mass or momentum must occur at the faces between cells:

            <MathJax>
              {`$$
                \\Delta_k q_i = \\sum_{j\\in nbrs(i)} \\Delta_k q_{ij}
              $$`}
            </MathJax>

      where q_ij is the net amount of quantity exchanged between i and j in a small time step. It just means that for a very small time interval, the amount of something lost or gained must be the amount transferred via neighbors. Now, for a large time interval, this is not true. <br/><br/>

      We don't need much more to get a system that behaves like a fluid. All we need now is to think about Newton's laws and some basic thermodynamics. Firstly, momentum is conserved, and forces are equal and opposite:

            <MathJax>
              {`$$
                \\Delta_k (\\rho_i v_i) = \\sum_{j\\in nbrs(i)} \\Big[f(i, j) + g(i,j) + h(i, j) \\Big] \\Delta t_k
              $$`}
            </MathJax>

      The first term, f, is the momentum flux. What is this? Fluid itself carries momentum, it is one of the quantities we model moving between cells. A giant wave carries a lot of momentum. This travels by advection, and is proportional to the difference in velocity between neighbors. <br/><br/>

    The second term is less intuitive, representing a force in the plane of the face; put your hands together and slide one up and one down. This is 'shearing', and is the basis of viscosity in fluids. It causes velocity to diffuse out as the fluid drags itself around the place. For highly viscous fluids, this is more obvious. <br/><br/>

    The final component is something I find interesting. In a system that begins with only velocity in one direction, say along the x axis, advection and viscosity can cause velocity to spread around an exchange between cells, but velocity in the y axis will always be zero. We need, mathematically, some way for velocity in the x direction to become velocity in the y direction, leading to circulation as in real fluids. I think this is quite deep. Mathematically, if I recall correctly, without this the velocity field will be irrotaional; there will be no circulation, whirls, vortexes, or anything interesting (assuming initial conditions in one direction) <br/><br/>

      This final contribution, h, is also our connection to thermodynamics. It's actually the negative spatial gradient of the pressure. As fluid flows into a region, the pressure will build, causing a force that pushes in all directions! Now, if this is developed a bit further, we can arrive at the Navier-Stokes equations. But it's a bit too complicated for me & this blog. See <a href="https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations"> the Wikipedia article </a>. Or, see the <a href="https://en.wikipedia.org/wiki/Euler_equations_(fluid_dynamics)"> Euler equations </a>, which govern incompressible flows in which pressure forces transmit instantaneously, and mathematically is a bit simpler. <br/><br/>

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
        In SPH, the situation is surprisingly similar, except for the fact that we no longer have a fixed grid. Instead, we have a finite set of particles which serve as dynamic, grid points. Then, when we want to know the value of any quantity at time t, we average over nearby particles. The particles themselves are not water molecules, but points that flow along with the fluid that we use to interpolate our quantities of interest. The interesting dynamics are quite similar. A crucial component of this is that we use some _kernel_ function to do our interpolation. This is a function like a probability density function that integrates to one. Any quantity is then averaged over other particles (<a href="https://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics"> see Wikipedia for some details </a>):

        <MathJax>
          {`$$
            E[q(x)] = \\int q(y) W(|y-x|) dV(y) \\approx \\sum_{j \\in particles} V_j^t q_j^t W(|y_j - x|)
          $$`}
        </MathJax>

    Here, I have chosen to define this as an expected value. This might not be technically accurate (depending on the properties of W), but it helps me to think about it. Furthermore, if the chosen kernel is "compact" (just means it is zero outside of a finite region), only local information is required to compute the average. If you look at W like a probability density, we are computing the expectation of some quantity. This can be a density, or it can be approximated but a set of finite points around the place. Now, just like before, we have a few quantities, including velocity, density, and pressure. How do we deal with them?

      <ul>
        <li> Continuity doesn't really feature anymore. In a similar-ish way, with a compact kernel we require only local information when updating particle quantities. </li>
        <li> Advection this time come for free, given that the particles themselves are simulated classically & move around. </li>
        <li> Viscosity, giving diffusion of momentum, this time is a bit more complex or fuzzy. We use a diffusive function called 'artificial viscosity' to compute viscous forces at a particular time. It's just a fudge, at the end of the day. </li>
        <li> Finally, we have pressure, like before, which is also a quantity carried by the particles. The simplest method for this involves computing it as a function of particle densities, as an equation of state. </li>
      </ul>

    All we have to do in our main loop is compute density, forces, and pressure. We then apply the forces using a leapfrog integrator. SPH has some advantages and disadvantages when compared to CFD. Firstly, it's much better at simulating moving bodies and fluid interfaces, such as a droplet in air. Using the CFD grid method, it's not clear how to represent interfaces. It can be used for simulation of multi-phase fluids. On the other hand, it's also considered less realistic. 

      </p>

      <h3> A quick note on conservation of momentum </h3>
      <p>
      Conservation was mentioned a lot in the first part of this post. I don't really mention it in the second, but in order to get a system in which momentum is conserved, we do need our rules to have a particular form. In a previous blog post I talked about functionals and the principle of least action. As it happens, if a particular Lagrangian is taken in the context of SPH particles, the momentum equation that is typically used can be derived. I won't reproduce it here, but the <a href="https://en.wikipedia.org/wiki/Smoothed-particle_hydrodynamics"> Wikipedia article </a> has a good description.
      </p>

    </div>
  );
};
