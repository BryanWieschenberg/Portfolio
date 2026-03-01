import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects, work, Project, Work as WorkType } from '../constants';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import { FaGithub, FaArrowRight, FaBriefcase, FaRocket, FaBolt, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Work: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const topRef = useRef<HTMLParagraphElement | null>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    const flagships = projects.filter((p) => p.scale === 0);
    const medium = projects.filter((p) => p.scale === 1);
    const small = projects.filter((p) => p.scale === 2);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
        },
    };

    const itemVariants = {
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

    const getScaleBadge = (scale: number) => {
        switch (scale) {
            case 0:
                return {
                    label: 'Flagship',
                    icon: <FaRocket className="inline mr-1" />,
                    color:
                        theme === 'light'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                };
            case 1:
                return {
                    label: 'Medium',
                    icon: <FaStar className="inline mr-1" />,
                    color:
                        theme === 'light'
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                };
            default:
                return {
                    label: 'Small',
                    icon: <FaBolt className="inline mr-1" />,
                    color:
                        theme === 'light'
                            ? 'bg-amber-100 text-amber-700 border-amber-200'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                };
        }
    };

    const getSkillColor = (level: number) => {
        switch (level) {
            case 0:
                return theme === 'light'
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : 'bg-blue-900/40 text-blue-300 border-blue-700/50';
            case 1:
                return theme === 'light'
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'bg-green-900/40 text-green-300 border-green-700/50';
            case 2:
                return theme === 'light'
                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    : 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50';
            case 3:
                return theme === 'light'
                    ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200'
                    : 'bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-700/50';
            default:
                return theme === 'light'
                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-slate-800/40 text-slate-300 border-slate-600/50';
        }
    };

    const renderProjectCard = (project: Project) => {
        const badge = getScaleBadge(project.scale);
        const firstLine = project.desc.split('\n')[0].replace('• ', '');

        return (
            <motion.div
                key={project.slug}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/work/projects/${project.slug}`)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500
                    ${
                        theme === 'light'
                            ? 'bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-lg hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]'
                            : 'bg-[#0b1021]/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl hover:shadow-[0_12px_40px_rgba(60,134,255,0.3)]'
                    }`}
            >
                {/* Animated top gradient border */}
                <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 group-hover:h-[3px]
                    ${
                        theme === 'light'
                            ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500'
                            : 'bg-gradient-to-r from-[#3c86ff] via-[#69f1ff] to-[#3c86ff]'
                    }`}
                />

                {/* Hover shimmer effect */}
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 0.08, x: '200%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-0"
                />

                <div className="relative z-10 p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 mr-3">
                            <h3
                                className={`text-xl font-bold transition-colors duration-300
                                ${
                                    theme === 'light'
                                        ? 'text-slate-900 group-hover:text-blue-600'
                                        : 'text-white group-hover:text-[#69f1ff]'
                                }`}
                            >
                                {project.name}
                            </h3>
                            <p
                                className={`text-xs font-semibold mt-1 tracking-wider uppercase
                                ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                            >
                                {project.date} • {project.span}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.color}`}
                            >
                                {badge.icon}
                                {badge.label}
                            </span>
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`transition-colors duration-300 ${theme === 'light' ? 'text-slate-400 hover:text-blue-600' : 'text-gray-500 hover:text-white'}`}
                                    title="View Repository"
                                >
                                    <FaGithub size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* One-line description */}
                    <p
                        className={`text-sm leading-relaxed mb-4 flex-grow line-clamp-2
                        ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                    >
                        {firstLine}
                    </p>

                    {/* Skills */}
                    {project.skills && Object.keys(project.skills).length > 0 && (
                        <div className="mt-auto pt-3 border-t border-gray-700/30">
                            <div className="flex flex-wrap gap-1.5">
                                {Object.entries(project.skills)
                                    .slice(0, 5)
                                    .map(([skill, level], i) => (
                                        <span
                                            key={i}
                                            className={`px-2 py-0.5 rounded-md text-xs font-medium border whitespace-nowrap ${getSkillColor(level as number)}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                {Object.keys(project.skills).length > 5 && (
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium self-center ${theme === 'light' ? 'text-slate-400' : 'text-gray-500'}`}
                                    >
                                        +{Object.keys(project.skills).length - 5}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* View Case Study */}
                    <div
                        className={`mt-4 flex items-center gap-2 text-sm font-semibold transition-all duration-300
                        ${theme === 'light' ? 'text-blue-500 group-hover:text-blue-700' : 'text-blue-400 group-hover:text-[#69f1ff]'}`}
                    >
                        <span>View Case Study</span>
                        <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderExperienceCard = (exp: WorkType) => {
        const imagePath = `/images/${exp.company.toLowerCase().replace(/\s+/g, '')}.png`;
        const firstLine = exp.desc.split('\n')[0].replace('• ', '');

        return (
            <motion.div
                key={exp.slug}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/work/experience/${exp.slug}`)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500
                    ${
                        theme === 'light'
                            ? 'bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-lg hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]'
                            : 'bg-[#0b1021]/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl hover:shadow-[0_12px_40px_rgba(60,134,255,0.3)]'
                    }`}
            >
                {/* Animated side gradient border */}
                <div
                    className={`absolute top-0 left-0 bottom-0 w-[3px] transition-all duration-500 group-hover:w-[4px]
                    ${
                        theme === 'light'
                            ? 'bg-gradient-to-b from-blue-400 via-purple-400 to-blue-500'
                            : 'bg-gradient-to-b from-[#3c86ff] via-[#8580e7] to-[#69f1ff]'
                    }`}
                />

                {/* Hover shimmer */}
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 0.06, x: '200%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-0"
                />

                <div className="relative z-10 p-6 pl-8 flex items-start gap-5">
                    {/* Company Logo */}
                    <div
                        className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden flex items-center justify-center shadow-lg
                        ${theme === 'light' ? 'bg-white border border-slate-200' : 'bg-white/10 border border-gray-600/50'}`}
                    >
                        <img
                            src={imagePath}
                            alt={`${exp.company} logo`}
                            className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/default.png';
                            }}
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h3
                            className={`text-xl font-bold transition-colors duration-300
                            ${
                                theme === 'light'
                                    ? 'text-slate-900 group-hover:text-blue-600'
                                    : 'text-white group-hover:text-[#69f1ff]'
                            }`}
                        >
                            {exp.role}
                        </h3>
                        <p
                            className={`text-sm font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}
                        >
                            {exp.company}
                        </p>
                        <p
                            className={`text-xs mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            {exp.date}
                        </p>
                        <p
                            className={`text-sm mt-2 leading-relaxed line-clamp-2
                            ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                        >
                            {firstLine}
                        </p>

                        {/* Skills */}
                        {exp.skills && Object.keys(exp.skills).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {Object.entries(exp.skills)
                                    .slice(0, 5)
                                    .map(([skill, level], i) => (
                                        <span
                                            key={i}
                                            className={`px-2 py-0.5 rounded-md text-xs font-medium border whitespace-nowrap ${getSkillColor(level as number)}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                {Object.keys(exp.skills).length > 5 && (
                                    <span
                                        className={`text-xs font-medium self-center ${theme === 'light' ? 'text-slate-400' : 'text-gray-500'}`}
                                    >
                                        +{Object.keys(exp.skills).length - 5}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* CTA */}
                        <div
                            className={`mt-3 flex items-center gap-2 text-sm font-semibold transition-all duration-300
                            ${theme === 'light' ? 'text-blue-500 group-hover:text-blue-700' : 'text-blue-400 group-hover:text-[#69f1ff]'}`}
                        >
                            <span>View Case Study</span>
                            <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderProjectSection = (
        title: string,
        items: Project[],
        gradient: string,
        icon: React.ReactNode,
    ) => {
        if (items.length === 0) {
            return null;
        }

        return (
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={containerVariants}
                className="mb-16"
            >
                <motion.div
                    variants={headerVariants}
                    className="flex items-center justify-center gap-3 mb-8"
                >
                    <span
                        className={`text-3xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                    >
                        {icon}
                    </span>
                    <h3
                        className={`text-2xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${gradient}
                        ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]'}`}
                    >
                        {title}
                    </h3>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((p) => renderProjectCard(p))}
                </div>
            </motion.section>
        );
    };

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>

            {/* Hero */}
            <div className="pt-16 lg:pt-20 text-center px-4">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1
                        className={`text-6xl lg:text-8xl font-bold lg:mt-2 pb-2 text-center relative bg-clip-text text-transparent
                        ${
                            theme === 'light'
                                ? 'bg-gradient-to-r from-blue-700 to-cyan-500 drop-shadow-[3px_3px_1px_rgba(30,30,160,0.2)]'
                                : 'bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'
                        }`}
                    >
                        My Work
                    </h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`mt-2 text-lg lg:text-xl max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                >
                    Case studies of projects I've built and professional experience I've gained.
                </motion.p>

                {/* Section jump buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-6 flex flex-wrap justify-center gap-4"
                >
                    <button
                        onClick={() =>
                            experienceRef.current?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2
                        ${
                            theme === 'light'
                                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                                : 'bg-blue-600 text-white shadow-[0_0_15px_rgba(30,144,255,0.4)] hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(30,144,255,0.7)]'
                        }`}
                    >
                        <FaBriefcase />
                        Experience
                    </button>
                    <button
                        onClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className={`px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2
                        ${
                            theme === 'light'
                                ? 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                                : 'border-[#69f1ff] text-[#69f1ff] hover:bg-[#69f1ff] hover:text-[#0b1021]'
                        }`}
                    >
                        <HiSparkles />
                        Projects
                    </button>
                </motion.div>
            </div>

            {/* Projects Section */}
            <div ref={projectsRef} className="container mx-auto px-4 lg:px-20 pt-16 pb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    <motion.div variants={headerVariants} className="text-center mb-12">
                        <h2
                            className={`text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#69f1ff] to-[#3c86ff]
                            ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                        >
                            Projects
                        </h2>
                        <p
                            className={`mt-2 text-base lg:text-lg ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            Things I've built from scratch.
                        </p>
                    </motion.div>
                </motion.div>

                {renderProjectSection(
                    'Flagships',
                    flagships,
                    'from-[#3c86ff] to-[#69f1ff]',
                    <FaRocket />,
                )}
                {renderProjectSection(
                    'Medium-Scale',
                    medium,
                    'from-[#34d399] to-[#6ee7b7]',
                    <FaStar />,
                )}
                {renderProjectSection(
                    'Small-Scale',
                    small,
                    'from-[#fbbf24] to-[#fcd34d]',
                    <FaBolt />,
                )}
            </div>

            {/* Divider */}
            <div className="container mx-auto px-20 pt-8">
                <div
                    className={`h-[1px] w-full ${theme === 'light' ? 'bg-gradient-to-r from-transparent via-slate-300 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-700 to-transparent'}`}
                />
            </div>

            {/* Professional Experience Section */}
            <div ref={experienceRef} className="container mx-auto px-4 lg:px-20 pt-20 pb-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    <motion.div variants={headerVariants} className="text-center mb-10">
                        <h2
                            className={`text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8580e7] to-[#3c86ff]
                            ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                        >
                            Professional Experience
                        </h2>
                        <p
                            className={`mt-2 text-base lg:text-lg ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            Roles where I've delivered real impact.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-5">
                        {work.map((exp) => renderExperienceCard(exp))}
                    </div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default Work;
