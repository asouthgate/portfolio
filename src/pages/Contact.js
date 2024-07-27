import { React, useState } from 'react';
import { getEvent } from '../api/requests'
import exampleImage from '../assets/site-image.png';
import { FloatEffect } from '../Effects';
import './common.css'


const Publications = () => {

  return (
    <div className="container home-container">
        <div className="row text-center" style={{height:"50vh"}}>
            <div className="col-12 col-md-3"/>
            <div className="col-12 col-md-6 m-auto">
                <div>
                   <h1> Contact </h1>
                   <p style={{textAlign:"center"}}> I am always looking to take on interesting projects. </p>
                   <p style={{textAlign:"center"}}> The best way to reach out is via LinkedIn: </p>
                   <a href="https://www.linkedin.com/in/alexjsouthgate/">https://www.linkedin.com/in/alexjsouthgate/</a>
                </div>
            </div>
            <div className="col-12 col-md-3"/>
        </div>
    </div>
  );
};

export default Publications;

