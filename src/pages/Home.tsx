import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../constants';
import { FaLocationDot, FaFileLines, FaGithub, FaEarthAmericas } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeReveal from '../components/SwipeReveal';
import { useTheme } from '../context/ThemeContext';
import { PiArrowFatLinesRightFill } from 'react-icons/pi';

function useLgUp() {
    const [isLgUp, setIsLgUp] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const handler = () => setIsLgUp(mq.matches);
        handler();
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return isLgUp;
}

const Home: React.FC = () => {
    const { theme } = useTheme();
    const topRef = useRef<HTMLParagraphElement | null>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    const age = useMemo(() => {
        const birthDate = new Date('2003-08-11');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }, []);

    const featuredProjects = projects.filter(
        (item) => item.name === 'GoalGetter' || item.name === 'StreamLine',
    );

    const scrollToFeatured = (e: React.MouseEvent) => {
        e.preventDefault();
        featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const ContactMe = (e: React.MouseEvent) => {
        e.preventDefault();
        topRef.current?.scrollIntoView();
        setTimeout(() => {
            navigate('/contact');
        }, 0);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const isLgUp = useLgUp();

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>

            <AnimatePresence>
                {!isIntroComplete && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[90] pointer-events-none"
                        style={{
                            background:
                                theme === 'light'
                                    ? 'linear-gradient(to bottom, #f1f5f9, #e2e8f0 40%, #cbd5e1 100%)'
                                    : 'linear-gradient(to bottom, #1e242b, #0f1214ff 40%, #0c0d0dff 100%)',
                        }}
                    />
                )}
            </AnimatePresence>

            <div
                className={`main-content relative z-[95] flex flex-col lg:flex-row items-center justify-center pt-8 lg:pt-12 w-full transition-all duration-300 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
            >
                <div className="flex flex-col lg:flex-row items-center justify-center container mx-auto px-4 lg:px-20 max-w-7xl">
                    <div className="text-center lg:text-left lg:w-3/5 flex flex-col items-center lg:items-start">
                        <div className="mt-4">
                            <SwipeReveal onComplete={() => setIsIntroComplete(true)}>
                                <h1
                                    className={`text-5xl lg:text-8xl font-bold leading-tight text-center lg:text-left whitespace-nowrap 
                                    ${theme === 'light' ? 'drop-shadow-[3px_3px_1px_rgba(30,30,160,0.2)]' : 'drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                                >
                                    Hi, I'm{' '}
                                    <span className="relative bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] bg-clip-text text-transparent">
                                        Bryan 👋
                                    </span>
                                </h1>
                            </SwipeReveal>
                        </div>

                        <AnimatePresence>
                            {isIntroComplete && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full flex flex-col items-center lg:items-start"
                                >
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-1 flex text-xl lg:text-3xl font-semibold leading-relaxed drop-shadow-lg ${theme === 'light' ? 'text-slate-800' : 'text-[#f0f4f8]'}`}
                                    >
                                        {isLgUp && (
                                            <PiArrowFatLinesRightFill className="shrink-0 text-xl lg:text-3xl" />
                                        )}
                                        <span className="lg:pl-2">
                                            Full-Stack Engineer{' '}
                                            <span className="pl-1 lg:pl-2 text-sm lg:text-xl">
                                                (Backend-Focused)
                                            </span>
                                        </span>
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-2 flex items-center font-medium ${theme === 'light' ? 'text-blue-600' : 'text-[#69f1ff]'}`}
                                    >
                                        <FaLocationDot className="mr-2" />
                                        <span>{age} y/o from Montville, New Jersey</span>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-6 text-base lg:text-xl max-w-2xl text-center lg:text-left leading-relaxed italic ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                                    >
                                        I build full-stack solutions and backend systems that scale,
                                        are secure, and can perform under even the harshest
                                        conditions.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="mt-8 flex flex-row justify-center lg:justify-start space-x-4 w-full"
                                    >
                                        <button
                                            onClick={scrollToFeatured}
                                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(30,144,255,0.5)] hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(30,144,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 text-lg lg:text-xl"
                                        >
                                            View Work
                                        </button>
                                        <button
                                            onClick={ContactMe}
                                            className="px-6 py-3 border-2 border-[#69f1ff] text-[#69f1ff] font-bold rounded-xl shadow-[0_0_10px_rgba(105,241,255,0.1)] hover:bg-[#69f1ff] hover:text-[#0b1021] hover:shadow-[0_0_20px_rgba(105,241,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 text-lg lg:text-xl"
                                        >
                                            Get in Touch
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-6 flex flex-wrap justify-center lg:justify-start gap-6 font-medium ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                                    >
                                        <a
                                            href="/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf"
                                            target="_blank"
                                            className={`transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-white'}`}
                                        >
                                            <FaFileLines />
                                            <span>Resume</span>
                                        </a>
                                        <a
                                            href="https://github.com/BryanWieschenberg/"
                                            target="_blank"
                                            className={`transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-white'}`}
                                        >
                                            <FaGithub />
                                            <span>GitHub</span>
                                        </a>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center items-center mt-12 lg:mt-0 lg:w-2/5 w-full">
                        <AnimatePresence>
                            {isIntroComplete && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative group perspective"
                                >
                                    <motion.div
                                        animate={{
                                            scale: [0.8, 1, 0.8],
                                            opacity: [0.25, 0.6, 0.25],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="absolute -inset-1 bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] rounded-full blur"
                                    ></motion.div>
                                    <img
                                        src="/images/photo.png"
                                        alt="Bryan"
                                        className="relative rounded-full border-4 border-[#3c86ff] object-cover w-64 h-64 lg:w-96 lg:h-96 transform transition duration-500 hover:scale-105 shadow-2xl z-10"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {isIntroComplete && (
                <div ref={featuredRef} className="container mx-auto px-4 lg:px-20 pt-24 pb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className={`text-4xl lg:text-6xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#69f1ff] to-[#3c86ff] 
                                ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                        >
                            Featured Work
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className={`text-center mb-12 text-lg lg:text-xl ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            A selection of my strongest engineering projects.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {featuredProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`group relative p-[2px] rounded-2xl shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 
                                        ${
                                            theme === 'light'
                                                ? 'bg-gradient-to-br from-white via-blue-50 to-white hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]'
                                                : 'bg-gradient-to-br from-[#1a2035] via-[#2a3045] to-[#1a2035] hover:shadow-[0_10px_30px_rgba(60,134,255,0.4)]'
                                        } 
                                        overflow-hidden`}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        animate={{ opacity: [0, 0.5, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className={`absolute inset-0 bg-gradient-to-r from-transparent z-0 pointer-events-none
                                            ${theme === 'light' ? 'via-blue-200/30' : 'via-[rgba(105,241,255,0.2)]'}`}
                                    ></motion.div>

                                    <div
                                        className={`relative z-10 rounded-xl backdrop-blur-sm p-6 h-full flex flex-col border 
                                        ${theme === 'light' ? 'bg-white/90 border-slate-200' : 'bg-[#0b1021]/90 border-gray-700/50'}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3
                                                className={`text-2xl font-bold transition-colors duration-300 
                                                ${theme === 'light' ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-[#69f1ff]'}`}
                                            >
                                                {project.name}
                                            </h3>
                                            {project.github ? (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                                    title="View Project"
                                                >
                                                    <FaEarthAmericas size={24} />
                                                </a>
                                            ) : (
                                                <span title="Private Project">
                                                    <FaEarthAmericas
                                                        size={24}
                                                        className="text-gray-600"
                                                    />
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-blue-400 font-semibold mb-3 tracking-wider uppercase">
                                            {project.date} • {project.span}
                                        </p>

                                        <p
                                            className={`text-sm leading-relaxed mb-6 flex-grow ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                                        >
                                            {project.desc.split('\n')[0].replace('• ', '')}
                                        </p>

                                        {project.skills && (
                                            <div className="mt-auto pt-4 border-t border-gray-700/50">
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(project.skills)
                                                        .slice(0, 5)
                                                        .map(([skill], i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2.5 py-1 bg-blue-900/30 text-blue-300 rounded-md text-xs font-medium border border-blue-800/50 whitespace-nowrap"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    {Object.keys(project.skills).length > 5 && (
                                                        <span className="px-2.5 py-1 text-gray-500 text-xs font-medium self-center">
                                                            +
                                                            {Object.keys(project.skills).length - 5}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-12 text-center transition-all duration-700 delay-500 ease-out transform"
                        >
                            <button
                                onClick={() => navigate('/work')}
                                className={`text-lg font-medium inline-flex items-center space-x-2 group ${theme === 'light' ? 'text-slate-500 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}
                            >
                                <span>View all projects</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            <br />
            <br />
        </>
    );
};

export default Home;
