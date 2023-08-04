import React from "react";

const Lights = () =>{
    return(
        <>
        <hemisphereLight intensity={5} groundColor='black' />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight intensity={1} />
        </>
    )

}

export default Lights;