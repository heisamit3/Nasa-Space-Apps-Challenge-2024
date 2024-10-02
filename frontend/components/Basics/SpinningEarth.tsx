import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

const SpinningEarth: React.FC = () => {
  const globeEl = useRef<any>();

  useEffect(() => {
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5; // Adjust rotation speed here
    }
  }, []);

  return (
    <div style={{ 
      width: '700px',  // Adjust this value to make the globe smaller
      height: '300px', // Adjust this value to make the globe smaller
      overflow: 'hidden', // Prevent overflow
      margin: 'auto'  // Center the globe
    }}>
      <Globe
        ref={globeEl}
        width={700} // Set the width of the globe
        height={300} // Set the height of the globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
};

export default SpinningEarth;