// import React, { Suspense } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'
// import CanvasLoader from '../Loader'

// const Ball = (props) => {
//   const [decal] = useTexture([props.imgUrl])

//   return (
//     <Float>Ball</Float>
//   )
// }

// const BallCanvas = () => {
//   return (
//     <Canvas frameloop='demand' gl={{ preserveDrawingBuffer: true }}>
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls enableZoom={false} />
//         <Ball imgUrl='/textures/ball.png' />
//       </Suspense>
//       <Preload all />
//     </Canvas>
//   )
// }
// export default BallCanvas

// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";

// import CanvasLoader from "../Loader";

// const Ball = (props) => {
//   const [decal] = useTexture([props.imgUrl]);

//   return (
//     <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.25} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         <meshStandardMaterial
//           color='#fff8eb'
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[2 * Math.PI, 0, 6.25]}
//           scale={1.25}
//           map={decal}
//           flatShading
//         />
//       </mesh>
//     </Float>
//   );
// };

// const BallCanvas = ({ icon }) => {
//   return (
//     <Canvas
//       frameloop='demand'
//       dpr={[1, 2]}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls enableZoom={false} />
//         <Ball imgUrl={icon} />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// export default BallCanvas;

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ isMobile }) => {
  const ball = useGLTF("./tech_ico/tech_ico.glb");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor='black' />

      <pointLight 
        position={[0,0,0]} 
        intensity={75} />
      <primitive
        object={ball.scene}
        scale={isMobile ? 4.5 : 4.5}
        position={isMobile ? [0,0,0] : [0,0,0]}
      />
    </mesh>
  );
};

const BallCanvas = () => {
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
          enableZoom={false}
          
        />
        <Ball isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;