import React, { useRef } from 'react';
import Timeline from './subpages/Timeline';
import Availability from './subpages/Availability';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
    const topRef = useRef<HTMLParagraphElement | null>(null);

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl lg:text-8xl font-bold lg:mt-2 pb-4 drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)] text-center relative bg-gradient-to-r from-[#0030ff] to-[#c4f9ff] bg-clip-text text-transparent"
            >
                Experience
            </motion.h1>
            <Timeline />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <Availability />
            </motion.div>
        </>
    );
};

export default Experience;
