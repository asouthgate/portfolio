import React, { useRef, useEffect, useState } from 'react';
import './common.css';
import { getEvent } from '../api/requests'
import rainCloud from '../assets/raincloud.png';
import { FloatEffect } from '../Effects';
import Publications from './Publications';
import Projects from './Projects';


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
    <div className="container-fluid home-container">
        <div className="row text-center">
            <div className="col">
                <div style={{ marginLeft: '5%', marginTop: '5%', marginRight: '5%' }}>
                    <h1 style={{ fontSize: '7em', textAlign: 'center'}}> ALEX J. SOUTHGATE, PhD</h1>
                    <h2 style={{ fontSize: '3em', textAlign: 'center'}}> Research Software Engineer </h2>
                </div>
                <div style={{ fontSize: '3em', textAlign: 'center'}}>
                  <FloatEffect className="additional-class">
                      <img src={rainCloud} alt="Example" className="img-fluid" />
                  </FloatEffect>
                </div>

            </div>
          <div/>
        </div>
    </div>
  );
};

export default Home;
