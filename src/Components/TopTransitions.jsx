import React from 'react'
import { motion } from 'framer-motion'


const Transitions = (OgComponent) => {
  return () => {
    return (
        <>
            <OgComponent/>
            {/* <motion.div className='slide-in'
            initial={{scaleY: 1}}
            animate={{scaleY: 0}}
            exit={{scaleY: 1}}
            transition={{duration: 0.8, ease : [0.4, 0.6, 0.36, 1], delay: 0.1}}
            /> */}

            <motion.div className='slide-out'
            initial={{scaleY: 1}}
            animate={{scaleY: 0}}
            exit={{scaleY: 1}}
            transition={{duration: 0.8, ease: [0.4, 0.6, 0.36, 1], delay: 0.1}}
            />
        </>
    )
  }
}

export default Transitions
