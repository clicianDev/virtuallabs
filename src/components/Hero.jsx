import { motion } from "framer-motion";

import { styles } from "../styles";
import { OfficeCanvas } from "./canvas";
import { useState } from "react";

const Hero = () => {
  const [isActive, setIsActive] = useState(false)
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const characterDetails = (selectedCharacter) => {
    setIsActive(true);
    setTitle(selectedCharacter.title)
    setDesc(selectedCharacter.description)
  }
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute z-10 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 drop-shadow-2xl`}
      >
        <div className="">
          <h1 className={`${styles.heroHeadText} text-white `}>
          Hi, {isActive ? `I'am` : `Welcome to`} <span className='text-primary '>{isActive ? title : `Virtual Labs`}</span>
          </h1>
          {isActive ? <p className={`${styles.heroSubText} mt-2 text-white-100`}>{desc}</p> : <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            We develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>}
        </div>
      </div>

      <OfficeCanvas onCharacterDetails={characterDetails}/>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-white-100 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-white-100 mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;