import React, { useRef } from 'react';
import Skills from './subpages/Skills';
import { motion } from 'framer-motion';

const About: React.FC = () => {
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
                About Me
            </motion.h1>

            <div className="flex flex-col lg:flex-row items-center justify-center mt-4 lg:mt-8 container mx-auto px-4 lg:px-40">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="lg:w-1/2 mb-8 lg:mb-0"
                >
                    <p className="text-xs lg:text-lg text-[#d7e0e0]">
                        Hi, I'm Bryan Wieschenberg, a passionate Computer Science student at The
                        College of New Jersey, currently in my 7th semester as a Senior! I'm a
                        software engineer with a strong focus on building secure, scalable
                        applications that make a real impact on the world.
                        <br />
                        <br />
                        I am highly proficient in many different technical fields, such as software
                        engineering, full-stack development, systems engineering, AI, and more! My
                        passion is leveraging technology to create solutions to problems that truly
                        make the world a better place. I have a unique blend of technical expertise
                        and leadership experience that has prepared me to develop remarkable
                        software, resolve complex challenges, collaborate cross-functionally, and
                        drive positive change in the world.
                        <br />
                        <br />
                        I'm eager to apply my skills, learn from industry professionals, take on new
                        challenges, and contribute to shaping the future of technology. Whether
                        through developing innovative software or fostering a collaborative
                        environment, I strive to leaving a positive impact anywhere I go!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="lg:w-1/2 flex justify-center"
                >
                    <img
                        src="./assets/images/tcnj.png"
                        alt="About"
                        className="rounded-lg shadow-lg w-[160px] h-[160px] lg:w-[320px] lg:h-[320px]"
                    />
                </motion.div>
            </div>

            <Skills />
            <div className="mb-80"></div>
        </>
    );
};

export default About;
