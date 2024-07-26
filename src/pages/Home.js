import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as GitlabIcon } from 'bootstrap-icons/icons/gitlab.svg';
import { ReactComponent as GithubIcon } from 'bootstrap-icons/icons/github.svg';
import './home.css';
import { getEvent } from '../api/requests'

const getRandomPosition = (min, max) => Math.random() * (max - min) + min;

const AnimatedDiv = ({ children }) => {
  const divRef = useRef(null);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const g = 0.00005;
    let currentX = getRandomPosition(-50, 50);
    let currentY = getRandomPosition(-50, 50);
    const targetX = 0;
    const targetY = 0;
    let currentU = -0.02;
    let currentV = 0.05;
    let lastTime;

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min(50.0, timestamp - lastTime);

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        currentU += g * dt * dx / distance;
        currentV += g * dt * dy / distance;
      }
      currentX += dt * currentU;
      currentY += dt * currentV;

      // Apply the transform
      element.style.transform = `translate(${currentX}px, ${currentY}px)`;

      // Request the next frame
      requestAnimationFrame(animate);
      lastTime = timestamp;
    };

    // Start the animation
    requestAnimationFrame(animate);

    return () => {
      // Clean up if the component unmounts
      element.style.transform = 'none';
    };
  }, []);

  return (
    <div ref={divRef} className="animated-text">
      {children}
    </div>
  );
};


const Home = () => {
  const divRef = useRef(null);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const g = 0.00005;
    let currentX = 50.0;
    let currentY = -30.0;
    let targetX = 0.0;
    let targetY = 0.0;
    let currentU = -0.02;
    let currentV = 0.05;
    let lastTime;

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min(50.0, timestamp - lastTime);

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        currentU += g * dt *  dx / distance;
        currentV += g * dt *  dy / distance;
      }
      currentX += dt * currentU;
      currentY += dt * currentV;

      // Apply the transform
      element.style.transform = `translate(${currentX}px, ${currentY}px)`;

      // Request the next frame
      requestAnimationFrame(animate);
      lastTime = timestamp;
    };

    // Start the animation
    requestAnimationFrame(animate);

    return () => {
      // Clean up if the component unmounts
      element.style.transform = 'none';
    };
  }, []);


  return (
    <div className="container home-container">
        <div className="row text-center d-flex flex-column justify-content-center">
            <div>
                <h1>
                    Alex J. Southgate 
                </h1>
                <h2> PhD </h2>
                <h3> Research Software Engineer </h3>
            </div>
            <div className="circle-container" ref={divRef} className="animated-text">
                <GitlabIcon/>
            </div>
           <AnimatedDiv>
                <GitlabIcon/>
            </AnimatedDiv> 
        </div>
    </div>
  );
};

export default Home;
