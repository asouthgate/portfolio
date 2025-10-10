import React, { useRef, useEffect, useState } from 'react';
import './common.css';
import { getEvent } from '../api/requests'
import rainCloud from '../assets/raincloud2.png';
import waveVideo from "../assets/crash.mp4";  
import { FloatEffect } from '../Effects';
import Publications from './Publications';
import Projects from './Blog';


const Home = () => {

  const aboutme = `
Croeso :) I am a research software engineer from Wales, UK.
My work is focused on solving software engineering problems
for scientific organisations. To do this, I make use of software
engineering principles, plenty of practice with algorithms,
knowledge of cloud & HPC systems, and scientific expertise.`;

  return (
    <div className="container-fluid home-container">
        <div style={{ marginLeft: '5%', marginTop: '0%', marginRight: '5%' }}>

<div style={{ position: 'relative', paddingTop: '0px', top: '-100px', height: '200px', overflow: 'visible' }}>
  <video
    src={waveVideo}
    width="600"
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: 'absolute',
      top: '-50px',       // sticks up, but inside padding
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 0,
    }}
  />

  <div
    style={{
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      color: 'white',
      paddingTop: '1rem',
    }}
  >
    <h1>ALEX J. SOUTHGATE, PhD</h1>
    <p> Figure 1: SPH simulation with 1 million particles and 2 liquid phases. Implemented with Vulkan on a cheap GPU, from scratch. </p>
  </div>
</div>
        </div>
    </div>
  );
};

export default Home;
