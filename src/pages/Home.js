import React, { useRef, useEffect, useState } from 'react';
import './home.css';
import { getEvent } from '../api/requests'
import exampleImage from '../assets/site-image.png';
import FloatEffect from '../FloatEffect';


const Home = () => {

  const aboutme = `
Croeso :) I am a research software engineer from Wales, UK.
My work is focused on solving software engineering problems
for scientific organisations. To do this, I make use of software
engineering principles, plenty of practice with algorithms,
knowledge of cloud & HPC systems, and scientific expertise.`;

  let speed_slow = 100;
  let speed_fast = 50;

  return (
    <div className="container home-container">
        <div className="row text-center">
            <div className="col-3"/>
            <div className="col-6">
                <div style={{ marginTop: '5%' }}>
                    <h1> Alex J. Southgate </h1>
                    <h4> PhD </h4>
                    <p> Research Software Engineer </p>
                    <p> {aboutme} </p>
                  <FloatEffect className="additional-class">
                      <img src={exampleImage} alt="Example" className="img-fluid" />
                  </FloatEffect>
                </div>
            </div>
            <div className="col-3"/>
        </div>
    </div>
  );
};

export default Home;
