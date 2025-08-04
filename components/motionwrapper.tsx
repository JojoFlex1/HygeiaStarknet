'use client'

import { motion, useInView, useAnimation } from 'motion/react'
import { useEffect, useRef } from 'react'

export default function MotionWrapper({
  children,
}: {
  children: React.ReactNode
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    useEffect(() => {
        if (isInView) {
            //Fire the animation
            mainControls.start("visible");
      }
  }, [isInView])
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}
