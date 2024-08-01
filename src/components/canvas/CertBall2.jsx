import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const CertBall2 = ({ isMobile }) => {
  const certball2 = useGLTF("./cert_dod/cert_ball2.glb");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor='black' />

      <pointLight 
        position={[0,0,0]} 
        intensity={75} />
      <primitive
        object={certball2.scene}
        scale={isMobile ? 2 : 4}
        position={isMobile ? [0,0,0] : [0,0,0]}
      />
    </mesh>
  );
};

const CertBallCanvas2 = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={-2}
          enableZoom={false}
          
        />
        <CertBall2 isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default CertBallCanvas2;