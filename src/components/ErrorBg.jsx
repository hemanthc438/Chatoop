import React, { useCallback } from 'react'
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import errorConfig from '../config/errorConfig';
import { loadFull } from 'tsparticles';

const ErrorBg = () => {
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
            options={errorConfig}
        />
  )
}

export default ErrorBg