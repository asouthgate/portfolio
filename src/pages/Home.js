import React, { useRef, useEffect, useState } from 'react';
import './common.css';
import { getEvent } from '../api/requests'
import Aphids from '../assets/plant-aphids.png';
import waveVideo from "../assets/crash.mp4";  
import { FloatEffect } from '../Effects';
import Publications from './Publications';
import Projects from './Blog';


const Home = () => {
  return (
    <div className="container-fluid home-container">
        <div style={{ marginLeft: '5%', marginTop: '0%', marginRight: '5%' }}>

            <div style={{ position: 'relative', paddingTop: '0px', top: '-100px', height: '200px', overflow: 'visible' }}>

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
                <p> Welcome. I am an engineer and computational biologist from South Wales. Currently, I work on drug discovery systems in industry. It is probably fair to say that I have an unusually broad range of interests in science and tech... occasionally this has led me to work in other fields such as gravitational wave physics. In my spare time, I like to grow plants, and am prototyping embedded systems for automation and instrumentation (perhaps toward some useful end one day). I am a fan of difficult video games, textbook problems, and dogs, which are a useful distraction from _gestures_outside_. </p>
                <p> Croeso. Dw i'n beiriannydd ac fiolegydd cyfrifiadurol o De Cymru. Ar hyn o bryd, dw i'n gweithio ar systemau ar gyfer darganfod cyffuriau mewn diwydiant. Mae'n deg dweud bo gen i ystod eang o ddiddordebau mewn gwyddoniaeth a thechnoleg... o bryd i'w gilydd, mae hyn wedi fy arwain i weithio mewn meysydd eraill, fel ffiseg tonnau disgyrchol. Yn fy amser sbâr, dw i'n hoffi tyfu planhigion, ac dw i'n creu prototeipiau o systemau awtomeiddio ac offeryniaeth (efallai ddefnyddiol un diwrnod). Dw i'n hoffi gemau fideo anodd, dysgu Cymraeg, a chŵn, sy'n ddefnyddiol fel tynnu sylw oddi wrth _ystumio_y_tu_allan. </p>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
