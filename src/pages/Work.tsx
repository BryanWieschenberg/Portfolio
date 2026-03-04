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
                className="card group"
            >
                <div className="card-top-border" />

                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 0.08, x: '200%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-0"
                />

                <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 mr-3">
                            <h3 className="card-title">{project.name}</h3>
                            <p className="date-meta mt-1">
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
                                    className={`transition-colors duration-300 ${theme === 'light' ? 'text-slate-400 hover:text-blue-600' : 'text-slate-500 hover:text-white'}`}
                                    title="View Repository"
                                >
                                    <FaGithub size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="card-text mb-4 flex-grow line-clamp-2">{firstLine}</p>

                    {project.skills && Object.keys(project.skills).length > 0 && (
                        <div className="mt-auto pt-3 border-t border-slate-700/30">
                            <div className="flex flex-wrap gap-1.5">
                                {Object.entries(project.skills)
                                    .slice(0, 5)
                                    .map(([skill, level], i) => (
                                        <span
                                            key={i}
                                            className={`skill-badge ${getSkillColor(level as number)}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                {Object.keys(project.skills).length > 5 && (
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium self-center ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                    >
                                        +{Object.keys(project.skills).length - 5}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="link-arrow mt-4">
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
                className="card group"
            >
                <div className="card-side-border" />

                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 0.06, x: '200%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-0"
                />

                <div className="relative z-10 p-6 pl-8 flex items-start gap-5">
                    <div className="logo-box w-14 h-14 lg:w-16 lg:h-16">
                        <img
                            src={imagePath}
                            alt={`${exp.company} logo`}
                            className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/default.png';
                            }}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="card-title">{exp.role}</h3>
                        <p className="item-subtitle">{exp.company}</p>
                        <p className="text-muted-xs mt-0.5">{exp.date}</p>
                        <p className="card-text mt-2 line-clamp-2">{firstLine}</p>

                        {exp.skills && Object.keys(exp.skills).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {Object.entries(exp.skills)
                                    .slice(0, 5)
                                    .map(([skill, level], i) => (
                                        <span
                                            key={i}
                                            className={`skill-badge ${getSkillColor(level as number)}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                {Object.keys(exp.skills).length > 5 && (
                                    <span
                                        className={`text-xs font-medium self-center ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                    >
                                        +{Object.keys(exp.skills).length - 5}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="link-arrow mt-3">
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
            <div className="page-hero">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1 className="page-title">My Work</h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="page-subtitle"
                >
                    Case studies of projects I've built and professional experience I've gained.
                </motion.p>

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
                        className="btn-solid-sm"
                    >
                        <FaBriefcase />
                        Experience
                    </button>
                    <button
                        onClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-outline-sm"
                    >
                        <HiSparkles />
                        Projects
                    </button>
                </motion.div>
            </div>

            <div ref={projectsRef} className="page-section-wide">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    <motion.div variants={headerVariants} className="text-center mb-12">
                        <h2 className="section-heading-xl from-[#69f1ff] to-[#3c86ff]">Projects</h2>
                        <p className="page-subtitle text-base lg:text-lg">
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

            <div className="container mx-auto px-20 pt-8">
                <div className="divider my-0" />
            </div>

            <div ref={experienceRef} className="container mx-auto px-4 lg:px-20 pt-20 pb-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    <motion.div variants={headerVariants} className="text-center mb-10">
                        <h2 className="section-heading-xl from-[#8580e7] to-[#3c86ff]">
                            Professional Experience
                        </h2>
                        <p className="page-subtitle text-base lg:text-lg">
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
