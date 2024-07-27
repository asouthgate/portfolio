import { React, useState } from 'react';
import { getEvent } from '../api/requests'
import rainCloud from '../assets/raincloud.png';
import resistanceMap from '../assets/resistance-drawings.png';
import cogUK from '../assets/cog-uk.png';
import BlackHoleInner from '../assets/blackhole-inner.png';
import BlackHoleOuter from '../assets/blackhole-outer.png';
import climbPaper from '../assets/climb-paper.png';
import {FloatEffect, SpinEffect} from '../Effects';
import './common.css' // change this to common
import './projects.css'


const GravWaveProjects = () => {
  return (
    <div className="row gravwave-projects project">
      <div className='col-12 col-md-6'>
      <h1> Gravitational Wave Physics </h1>
        <p>
            Since 2022 I have been working within the Gravity Exploration Institute, Cardiff. I 
            currently lead development of a prototype database system for the next generation of 
            gravitational wave event data. Given that we do not have a good handle on the upper limits
            of data volumes and throughput that must be supported by this system, this work mostly
            involves experimentation on design to account for these scenarios.
            I am also a member of the Laser Interferometer Gravitational-Wave Observatory (LIGO).
            For LIGO, my work is less exciting; mostly I develop & maintain accounting systems for
            distributed compute infrastructure (HTCondor). Some of my time is spent developing GWPy;
            mostly this is either a) fixing bugs in signal processing software or b) reviewing merge
            requests.  
        </p>
      </div>
      <div className='col-6 col-md-3'>
        <ul>
          <li>API development & REST</li>
          <li>Python</li>
          <li>Rust</li>
          <li>JavaScript, CSS, Bootstrap and React</li>
          <li>CI/CD (Gitlab) </li>
          <li>Testing methodologies</li>
          <li>Docker</li>
          <li>Formal Requirements Gathering</li>
          <li>Software Requirements Specifications</li>
          <li>PostGres</li>
          <li>Distributed database design</li>
        </ul>
      </div>
      <div className='col-6 col-md-3'>
        <ul>
          <li>Prototyping</li>
          <li>Signal Processing</li>
          <li>Apache</li>
          <li>Grafana</li>
          <li>Prometheus</li>
          <li>Multithreaded Applications</li>
          <li>Software Optimization</li>
          <li>Communication</li>
          <li>Collaborative development</li>
        </ul>
      </div>
    </div>
  );
};


const MathBioProjects = () => {
  return ( 
    <div className='row mathbio-projects project'>
        <div className='col-12 col-md-6'>
          <h1> Geospatial Databases </h1>
          <p>
            I have spent some time working on an interesting project in spatial ecology. This project 
            concerns the combination of circuit theory modelling and large LIDAR datasets to predict
            ecological migration patterns. I developed a webapp with a data pipeline backend performing
            scientific calculations and interfacing with PostGIS. A large proportion of this project
            was database organisation and optimisation.
          </p>
        <ul>
          <li>PostGres & PostGIS</li>
          <li>Vector & Raster databases</li>
          <li>R</li>
          <li>C++ & Rcpp</li>
          <li>RShiny</li>
          <li>Docker</li>
        </ul>
        </div>
        <div className='col-12 col-md-6'>
          <div>
           <img src={resistanceMap} alt="Example" className="img-fluid" />
          </div>
        </div>
    </div>
  );
};


const CloudProjects = () => {
  return ( 
    <div className='row cloud-projects project'>
          <h1> Cloud Computing </h1>
        <div className='col-12 col-md-6'>
          <p> 
            Although I make regular use of docker, virtualisation & cloud resources in most of my work, 
            I also developed and maintained CLIMB, the Cloud Infrastructure for Microbial Bioinformatics.
            This was an OpenStack system that we built from the ground up. I helped do the cabling,
            configure the firewalls, deploy, install, administer the OpenStack dashboard, and more. This 
            system was critical during the COVID-19 pandemic, underpinning the UK's exceptional genomic 
            epidemiology.
          </p>
          <ul>
            <li>Linnux, Bash & Python</li>
            <li>Virtualization</li>
            <li>OpenStack</li>
            <li>Ceph</li>
            <li>SLURM</li>
            <li>Networks & Firewalls</li>
            <li>Cloud System Design</li>
          </ul>
        </div>
        <div className='col-12 col-md-6'>
           <img src={climbPaper} alt="Example" className="img-fluid" />
        </div>

    </div>
  );
};


const BioinformaticsProjects = () => {
  return ( 
    <div>
    <div className='row bioinformatics-projects project'>
          <h1> Bioinformatics </h1>
        <div className='col-12 col-md-6'>
          <p>
            Last, but not least, I am an expert bioinformatician. I hold a PhD in algorithms and 
            statistical modelling for whole-genome sequence data from viruses such as influenza 
            and SARS-CoV-2. I spent some time seconded to Public Health Wales during the 2019 
            pandemic due to this expertise. I worked as part of a high-profile team working to
            decode the genetic variation of the virus (see COG-UK), in order to provide insights
            into both public health intervention and vaccine development.
          </p>
          <p>
            In addition to working in NHS Wales, I also spent a few months gaining experience at a biotech
            startup. I spent most of my time writing Python software specifically for testing, improving
            the unit tests of others, and setting up other test infrastructure.
          </p>
          <ul>
            <li>Python, R, Bash</li>
            <li>Statistical modelling </li>
            <li>Data analysis </li>
            <li>Bayesian modelling</li>
            <li>Algorithm design</li>
            <li>Epidemiology</li>
            <li>Presentations</li>
          </ul>
        </div>
        <div className='col-12 col-md-6'>
           <img src={cogUK} alt="Example" className="img-fluid" />
        </div>
    </div>
    </div>
  );
};


const Intro = () => {
  return (
    <div className="text-center projects">
        <div className="intro row" style={{padding: "2%"}}>
            <div className='col-12 col-md-6 d-flex flex-column'>
                <div className="image-container">
                  <SpinEffect className="image background" speed='100s' offset='90deg'>
                    <img src={BlackHoleOuter} alt="Foreground" className="image background" />
                  </SpinEffect>
                  {Array.from({ length: 1 }).map((_, i) => {
                    const speed = `${10 + (i + 1) * 3}s`;
                    const offset = `${i * 30}deg`;
                    return (
                      <SpinEffect key={i} className="image background" speed={speed} offset={offset}>
                        <img src={BlackHoleOuter} alt={`Spin effect ${i}`} className="image background" />
                      </SpinEffect>
                    );
                  })}
                  <SpinEffect className="image foreground" speed='0.5s'>
                    <img src={BlackHoleInner} alt="Background" className="image foreground" />
                  </SpinEffect>
                </div>
            </div>
            <div className='col-12 col-md-6' style={{ marginTop: '1%' }}>
            <h1> Projects </h1>
              <p> 
                I have worked on a diverse range of projects, 
                in a diverse range of scientific disciplines. 
                Some may say too diverse. On the contrary! I am 
                a problem solver at heart, an excellent
                self-directed learner, and I take
                initiative when things need figuring out. I am
                very comfortable working with physicists and 
                mathematicians, and have a good understanding of
                algorithms and mathematics required to interpret and
                fulfill their requirements.
              </p>
              <p>
                I also still help publish papers, from time to time.
                Most of the papers I have contributed to are research in
                healthcare, genomics, epidemiology, immunology, or something
                similar. A lot of these papers are in top journals! I have a good
                understanding of research data, and large scale research
                systems.
              </p>
              <p>
                I also won a 2023 fellowship from the Software Sustainability Institute!
                Testing is important to me. I am champion the need for unit tests
                and CI/CD in scientific organisations. There is work to do.
              </p>
           </div>
        </div>
    </div>
  );
};


const Projects = () => {

  return (
    <div className="container home-container">
        <Intro/>
        <GravWaveProjects/>
        <MathBioProjects/>
        <CloudProjects/>
        <BioinformaticsProjects/>
    </div>
  );
};

export default Projects;

