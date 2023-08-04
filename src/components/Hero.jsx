import { motion } from "framer-motion";

import { styles } from "../styles";
import { OfficeCanvas } from "./canvas";
const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute z-10 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 drop-shadow-2xl`}
      >
        <div className="">
          <h1 className={`${styles.heroHeadText} text-white `}>
            Hi, Welcome to <span className='text-primary '>Virtual Labs</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            We develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>
        </div>
      </div>

      <OfficeCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;