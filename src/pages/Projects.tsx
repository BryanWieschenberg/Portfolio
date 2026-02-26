import React, { useRef } from 'react';
import { projects } from '../constants';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import { FaEarthAmericas } from 'react-icons/fa6';

const Projects: React.FC = () => {
    const { theme } = useTheme();
    const topRef = useRef<HTMLParagraphElement | null>(null);

    const largeProjects = projects.filter((item) => item.scale === 0);
    const mediumProjects = projects.filter((item) => item.scale === 1);
    const smallProjects = projects.filter((item) => item.scale === 2);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const renderProjectCard = (project: any, index: number, gradient: string, bgColor: string) => (
        <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className={`group relative p-[6px] rounded-2xl shadow-lg transition-all duration-300 ease-out transform ${gradient}`}
        >
            <div
                className={`rounded-xl p-3 h-full flex flex-col ${theme === 'light' ? 'bg-white/90 backdrop-blur-sm' : bgColor}`}
            >
                <div className="flex justify-between items-center mb-1">
                    <h3
                        className={`text-xl font-bold truncate ${theme === 'light' ? 'text-slate-800' : 'text-gray-800'}`}
                    >
                        {project.name}
                    </h3>
                    {project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex-shrink-0 ml-2"
                        >
                            <FaEarthAmericas size={32} />
                        </a>
                    ) : (
                        <span title="This Project is Private" className="flex-shrink-0 ml-2">
                            <FaEarthAmericas size={32} className="text-gray-400" />
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                    {project.date} • {project.span}
                </p>
                <p className="mt-1 text-gray-700 whitespace-pre-line flex-grow overflow-y-auto max-h-32">
                    {project.desc}
                </p>
                {project.skills && Object.keys(project.skills).length > 0 && (
                    <div className="mt-auto pt-3">
                        <div className="flex flex-wrap gap-1">
                            {Object.entries(project.skills).map(([skill, level], i) => {
                                let badgeColor;
                                switch (level) {
                                    case 0:
                                        badgeColor = 'bg-blue-600';
                                        break;
                                    case 1:
                                        badgeColor = 'bg-green-600';
                                        break;
                                    case 2:
                                        badgeColor = 'bg-yellow-600';
                                        break;
                                    case 3:
                                        badgeColor = 'bg-red-600';
                                        break;
                                    case 4:
                                        badgeColor = 'bg-fuchsia-600';
                                        break;
                                    default:
                                        badgeColor = 'bg-gray-600';
                                }
                                return (
                                    <span
                                        key={i}
                                        className={`${badgeColor} px-2 py-1 rounded-lg border text-white border-white text-xs inline-block min-w-0 max-w-full truncate`}
                                    >
                                        {skill}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>
            <div className="pt-16 lg:pt-20 text-center px-4">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#0030ff] to-[#c4f9ff]"
                    shadowColor="shadow-[0_0_50px_rgba(0,48,255,0.6)]"
                    duration={0.6}
                >
                    <h1
                        className={`text-6xl lg:text-8xl font-bold lg:mt-2 pb-4 text-center relative bg-clip-text text-transparent
                        ${theme === 'light' ? 'bg-gradient-to-r from-blue-700 to-blue-400 drop-shadow-[3px_3px_1px_rgba(30,30,160,0.2)]' : 'bg-gradient-to-r from-[#0030ff] to-[#c4f9ff] drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                    >
                        Projects
                    </h1>
                </SwipeReveal>
            </div>

            <div className="container mx-auto px-4 lg:px-20 py-10">
                {largeProjects.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={containerVariants}
                        className="mb-12"
                    >
                        <motion.h2
                            variants={headerVariants}
                            className={`text-3xl lg:text-5xl text-center font-extrabold mb-6 relative drop-shadow-[7px_7px_1.5px_rgba(60,60,150,0.5)]
                                ${theme === 'light' ? 'text-blue-700' : 'text-[#4fbdf1]'}`}
                        >
                            Flagships
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {largeProjects.map((project, index) =>
                                renderProjectCard(
                                    project,
                                    index,
                                    'bg-gradient-to-t from-[#473eb4] to-[#00e5ff]',
                                    'bg-[#4fbdf1]',
                                ),
                            )}
                        </div>
                    </motion.section>
                )}

                {mediumProjects.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={containerVariants}
                        className="mb-12"
                    >
                        <motion.h2
                            variants={headerVariants}
                            className={`text-3xl lg:text-5xl text-center font-extrabold mb-6 relative drop-shadow-[7px_7px_1.5px_rgba(20,120,20,0.5)]
                                ${theme === 'light' ? 'text-green-700' : 'text-[#4ff192]'}`}
                        >
                            Medium-Sized
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mediumProjects.map((project, index) =>
                                renderProjectCard(
                                    project,
                                    index,
                                    'bg-gradient-to-t from-[#3eb47c] to-[#30ff00]',
                                    'bg-[#4ff192]',
                                ),
                            )}
                        </div>
                    </motion.section>
                )}

                {smallProjects.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={containerVariants}
                        className="mb-12"
                    >
                        <motion.h2
                            variants={headerVariants}
                            className={`text-3xl lg:text-5xl text-center font-extrabold mb-6 relative drop-shadow-[7px_7px_1.5px_rgba(120,120,30,0.5)]
                                ${theme === 'light' ? 'text-amber-700' : 'text-[#f1e24f]'}`}
                        >
                            Small-Scale
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {smallProjects.map((project, index) =>
                                renderProjectCard(
                                    project,
                                    index,
                                    'bg-gradient-to-t from-[#b4a03e] to-[#ffe700]',
                                    'bg-[#f1e24f]',
                                ),
                            )}
                        </div>
                    </motion.section>
                )}
            </div>
        </>
    );
};

export default Projects;
