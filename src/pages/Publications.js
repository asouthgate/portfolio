import { React, useState } from 'react';
import { getEvent } from '../api/requests'
import exampleImage from '../assets/site-image.png';
import { FloatEffect } from '../Effects';
import './common.css'


const Publications = () => {

  return (
    <div className="container home-container publications-container">
        <div className="row text-center publications-container">
            <div className="col-12 col-md-6 offset-md-3">
                <div style={{ marginTop: '5%' }}>
                   <h1> Publications </h1>
                   <p style={{textAlign:"center"}}> I have contributed to a wide variety of publications, either as a bioinformatics scientist, or by engineering computational systems required for large-scale project implementation. For a more complete list, go to: </p>
                   <a href="https://www.researchgate.net/profile/Alex-Southgate">https://www.researchgate.net/profile/Alex-Southgate</a>
                    <div>
                        <hr/>
                        <p> Abac et al. (2024). Observation of Gravitational Waves from the Coalescence of a 2.5–4.5 M⊙ Compact Object and a Neutron Star. The Astrophysical Journal Letters 970 L34. </p>
                        <hr/>
                        <p> Mack et al. (2023). A proofreading mutation with an allosteric effect allows a cluster of SARS-CoV-2 viruses to rapidly evolve. Molecular Biology and Evolution, 40(10), msad209. </p>
                        <hr/>
                        <p> Dolton et al. (2022). Emergence of immune escape at dominant SARS-CoV-2 killer T cell epitope. Cell 185(16) 2936-2951. </p>
                        <hr/>
                        <p> Volz et al. (2021). Evaluating the effects of SARS-CoV-2 spike mutation D614G on transmissibility and pathogenicity. Cell, 184(1), 64-75. </p>
                        <hr/>
                        <p> Nicholls et al. (2021). CLIMB-COVID: continuous integration supporting decentralised sequencing for SARS-CoV-2 genomic surveillance. Genome biology, 22, 1-21. </p>
                        <hr/>
                        <p> Southgate et al. (2020). Influenza classification from short reads with VAPOR facilitates robust mapping pipelines and zoonotic strain detection for routine surveillance applications. Bioinformatics, 36(6), 1681-1688. </p>
                        <hr/>
                        <p> Connor et al. (2016). CLIMB (the Cloud Infrastructure for Microbial Bioinformatics): an online resource for the medical microbiology community. Microbial genomics, 2(9), e000086. </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Publications;

