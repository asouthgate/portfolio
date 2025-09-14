import { MathJaxContext, MathJax } from 'better-react-mathjax';
import oilImg from '../../assets/oil.png';
import particle2x2 from '../../assets/particle_2x2_force_mag.png';


export const metadata = {
  title: "Blog1 Foo",
  date: "June 8, 2025"
};

export default function Sph2() {
  return (
    <div>
      <h1> Surprisingly hard: GPU particle index and SPH </h1>
      <h2> <i> Updated 2025-06-16 </i> </h2>
      <p>
        Why would that be surprising? I am used to implementing algorithms that have been well trodden before. This one was tough. Setting up a particle index on the GPU requires doing a few things:

        <ul>
        <li> You may be familiar with using flat indexes for arrays with more than one dimension. In 2D, you iterate as k = i * N + j. The counter k then walks steps from left to right across each row, before moving to the first item in the next row. As it happens, this is a bad idea for neighbor retrieval because close neighbors in 3D may be at quite a distance in 1D. In 2D, one row up will be N indexes away. Memory-wise, it is better to retrieve data that is close in memory. So, instead of a flat index, we use a special curve called a Morton curve, which snakes its way through the grid in way that keeps spatially close items relatively close index-wise. </li>
        <li> Once the Morton keys have been computed, they should be sorted, so that close neighbors can be retrieved together. This is much more efficient, especially on GPU, than random global memory access. I implemented a distributed radix sort. Radix sort is quite simple on the CPU: you take batches of b bits and sort them one at a time independently, from right to left. So for a 32-bit integer, you bucket sort the last 8 bits (put them into order by counting). Then you move to the next 8 bits, and so on. The reason it works is because the sort is stable. Re-sorting on the next batch of 8 bits keeps the previous batch in order within a bin. On the CPU, this is simple. On the GPU, this required several shaders, each of which needed a custom algorithm: histograms, prefix scans, transposes, final sorting, etc. This was probably the hardest part of the index. </li>
        <li> Once you have taken vec3 positions -> morton keys -> sorted morton keys you can now scatter particle data such as mass and start computing dynamic quantities. The actual grid structure that I outputted from my particle index used flat index, but it was constructed using Morton keys, and the sorting was used to order the data. I actually timed it, and using the sorted data was at least 5 times faster at basic density computations. </li>
        <li> In the final compute shaders, I compute vec3 positions -> ijk tuples -> flat index -> neighbors. The "neighbors" themselves are simple indexes (left, right) that point to particles that are in that cell (don't forget, they are sorted by Morton key). </li>
        </ul>

        Phew. I expect this will be more work than the SPH itself turns out to be. One thing to be aware of is that this is entirely GPU side. We don't want to frequently transfer data for millions of particles on and off the GPU. From this, I was able to move the SPH itself forward a bit. The following image shows a few bits of data that I retrieve from the GPU. The first is the Morton keys. I assign random colours to Morton keys but also mix this with a smooth spectrum from key to the final key. You can see close points have similar hue, but there are also grid discontinuities for individual cells. The second plot is density, the third pressure, and the last one pressure forces. 

          <img src={particle2x2} alt="Top left: Morton keys. Top right: density. Bottom left: pressure. Bottom right: pressure forces"   style={{
            display: 'block',
            margin: '0 auto',
            width: '100%',
            height: 'auto'
          }} />

     </p>

     </div>
  );
};
