import React, { Suspense, useEffect, useState, useRef, } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei";
import Lights from "./Lights";
import CanvasLoader from "../Loader";
import Me from "./Me";
import K from "./K";
import Chris from "./Chris";
import Luigi from "./Luigi";
import Dj from "./Dj";
import FlowG from "./FlowG";
import annotations from './annotations.json'
import Arnold from "./Arnold";

function Annotations({ selected, gotoAnnotation }) {
  return (
    <>
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg height="34" width="34" transform="translate(-16 -16)" style={{ cursor: 'pointer' }}>
              <circle cx="17" cy="17" r="16" stroke="white" strokeWidth="2" fill="rgba(0,0,0,.66)" onClick={() => gotoAnnotation(i)} />
              <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                {i + 1}
              </text>
            </svg>
            {a.description && i === selected && (
              <div id={'desc_' + i} className="annotationDescription text-white-100" dangerouslySetInnerHTML={{ __html: a.description }} />
            )}
          </Html>
        )
      })}
    </>
  )
}

function Animate({ controls, lerping, to, target }) {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta * 2)
      controls.current.target.lerp(target, delta * 2)
    }
  })
}

const Office = ({ isMobile }) => {
  const office = useGLTF("./office/office.gltf");

  return (
    <mesh>
      <primitive
        object={office.scene}
        // scale={isMobile ? 0.7 : 1}
        position={isMobile ? [0, 0,  0] : [0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const OfficeCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef()
  const [lerping, setLerping] = useState(false)
  const [to, setTo] = useState()
  const [target, setTarget] = useState()
  const [selected, setSelected] = useState(-1)

  function gotoAnnotation(idx) {
    setTo(annotations[idx].camPos)
    setTarget(annotations[idx].lookAt)
    setSelected(idx)
    setLerping(true)
  }
 
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
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      onPointerDown={() => setLerping(false)} onWheel={() => setLerping(false)}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          ref={ref}
           enableZoom={true}
          
        />
         <Annotations selected={selected} gotoAnnotation={gotoAnnotation} />
        <Animate controls={ref} lerping={lerping} to={to} target={target} />
     
        <Lights/>
        <Office isMobile={isMobile} />
        {/* <Me isMobile={isMobile}/> */}
        <K isMobile={isMobile}/>
        <Chris isMobile={isMobile}/>
        {/* <Luigi isMobile={isMobile}/>  */}
        <Dj isMobile={isMobile}
         position={isMobile ? [0, 0,  0] : [0, 0, -4]}
        />
       {/* <FlowG isMobile={isMobile}
         position={isMobile ? [0, 0,  0] : [2, 0, -4]}
        /> */}
        <Arnold isMobile={isMobile}
         position={isMobile ? [0, 0,  0] : [-1, 0, -0.5]}/>
      </Suspense>
      
      <Preload all />
    </Canvas>
  );
};

export default OfficeCanvas;