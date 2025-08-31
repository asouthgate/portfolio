import { MathJaxContext, MathJax } from 'better-react-mathjax';

export const metadata = {
  title: "Blog1 Foo",
  date: "June 8, 2025"
};

export default function Walk2() {
  return (
    <div>
      <h1> A walk through unfamiliar science, part 2 </h1>
        <p>
        In part 1 of this post, I wrote a bit about functionals, Euler-Lagrange equations, and Pontryagin's maximum principle. Here, I'm going to review a few papers that make use of this mathematics in the context of epidemiology control, and demonstrate a few simulations. Since writing the first post, I did a bit more digging on which paper to start with. Research is built up hierarchically, and usually it is best to start with earlier work; this is especially the case here, because we are exploring for interest, these papers are fairly complex, but also fairly recent. The other advantage is that in [2], the author undertakes simulation for this kind of problem. As a software engineer that takes joy in reinventing wheels, this will offer a good opportunity to explore the subject creatively.
        </p>
        <h2> References </h2>
        <ul>
            <li> Polyanin, A.D. and Manzhirov, A.V., 2006. Handbook of mathematics for engineers and scientists. Chapman and Hall/CRC. </li>
            <li> Ketcheson, D. I. (2021). Optimal control of an SIR epidemic through finite-time non-pharmaceutical intervention. Journal of mathematical biology, 83(1), 7. </li>
            <li> https://en.wikipedia.org/wiki/Pontryagin%27s_maximum_principle </li>
        </ul>
    </div>
  );
};
