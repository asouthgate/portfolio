import { React, useState } from 'react';
import { getEvent } from '../api/requests'
import exampleImage from '../assets/site-image.png';
import FloatEffect from '../FloatEffect';
import './home.css'


const Publications = () => {

  return (
    <div className="container home-container publications-container">
        <div className="row text-center publications-container">
            <div className="col-3"/>
            <div className="col-6">
                <div style={{ marginTop: '5%' }}>
                    <h1> Publications </h1>
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

export default Publications;

