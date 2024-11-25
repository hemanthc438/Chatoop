import React, { useCallback } from 'react'
import Particles from 'react-tsparticles';
import particlesConfig from '../config/particlesConfig';
import { loadSlim } from 'tsparticles-slim';

function ParticleBg() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
  return (
    <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig}
        />
  )
}

export default ParticleBg;