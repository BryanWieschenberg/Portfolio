import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../constants';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    FaArrowLeft,
    FaGithub,
    FaExternalLinkAlt,
    FaRocket,
    FaStar,
    FaBolt,
    FaUserCheck,
    FaCogs,
    FaImages,
    FaClipboardList,
} from 'react-icons/fa';

const ProjectDetail: React.FC = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const topRef = useRef<HTMLParagraphElement | null>(null);

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1
                    className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                >
                    Project Not Found
                </h1>
                <button
                    onClick={() => navigate('/work')}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all"
                >
                    ← Back to Work
                </button>
            </div>
        );
    }

    const getScaleInfo = (scale: number) => {
        switch (scale) {
            case 0:
                return {
                    label: 'Flagship Project',
                    icon: <FaRocket />,
                    color:
                        theme === 'light'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                    desc: 'Large-scale, 4+ weeks',
                };
            case 1:
                return {
                    label: 'Medium Project',
                    icon: <FaStar />,
                    color:
                        theme === 'light'
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                    desc: 'Mid-scale, 1-4 weeks',
                };
            default:
                return {
                    label: 'Small Project',
                    icon: <FaBolt />,
                    color:
                        theme === 'light'
                            ? 'bg-amber-100 text-amber-700 border-amber-200'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                    desc: 'Quick build, <1 week',
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

    const getSkillTypeLabel = (level: number) => {
        switch (level) {
            case 0:
                return 'Language';
            case 1:
                return 'Framework';
            case 2:
                return 'Tool';
            case 3:
                return 'Research';
            case 4:
                return 'Concept';
            default:
                return '';
        }
    };

    const scaleInfo = getScaleInfo(project.scale);
    const bullets = project.desc
        .split('\n')
        .map((b) => b.replace(/^•\s*/, '').trim())
        .filter((b) => b.length > 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>

            <div className="container mx-auto px-4 lg:px-20 pt-20 pb-16 max-w-5xl">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate('/work')}
                    className={`mb-8 flex items-center gap-2 text-sm font-semibold transition-all duration-300 group
                    ${theme === 'light' ? 'text-slate-500 hover:text-blue-600' : 'text-gray-400 hover:text-[#69f1ff]'}`}
                >
                    <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Work</span>
                </motion.button>

                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex flex-wrap items-start gap-4 mb-3">
                            <h1
                                className={`text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]
                                ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                            >
                                {project.name}
                            </h1>
                            <span
                                className={`mt-2 lg:mt-3 px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-1.5 ${scaleInfo.color}`}
                            >
                                {scaleInfo.icon}
                                {scaleInfo.label}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <p
                                className={`text-sm font-semibold tracking-wider uppercase
                                ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                            >
                                {project.date} • {project.span}
                            </p>
                            <span
                                className={`text-xs px-2 py-0.5 rounded ${theme === 'light' ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'}`}
                            >
                                {scaleInfo.desc}
                            </span>
                        </div>

                        {/* Action Links */}
                        <div className="flex flex-wrap gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5
                                    ${
                                        theme === 'light'
                                            ? 'bg-slate-900 text-white hover:bg-slate-700'
                                            : 'bg-white/10 text-white border border-gray-600 hover:bg-white/20'
                                    }`}
                                >
                                    <FaGithub /> View Repository
                                </a>
                            )}
                            {project.artifacts.liveUrl && (
                                <a
                                    href={project.artifacts.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            )}
                            {project.artifacts.demoUrl && (
                                <a
                                    href={project.artifacts.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 border-2 transition-all duration-300 transform hover:-translate-y-0.5
                                    ${
                                        theme === 'light'
                                            ? 'border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white'
                                            : 'border-[#69f1ff] text-[#69f1ff] hover:bg-[#69f1ff] hover:text-[#0b1021]'
                                    }`}
                                >
                                    <FaExternalLinkAlt /> Watch Demo
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Overview Section */}
                    <motion.div
                        variants={itemVariants}
                        className={`rounded-2xl p-6 mb-6 border
                        ${
                            theme === 'light'
                                ? 'bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-lg'
                                : 'bg-[#0b1021]/80 backdrop-blur-sm border-gray-700/50 shadow-2xl'
                        }`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaClipboardList
                                className={`text-xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                            />
                            <h2
                                className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                            >
                                Overview
                            </h2>
                        </div>
                        <ul className="space-y-3">
                            {bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span
                                        className={`mt-2 w-2 h-2 rounded-full flex-shrink-0
                                        ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                                    />
                                    <span
                                        className={`text-sm lg:text-base leading-relaxed
                                        ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                    >
                                        {bullet}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* My Contribution */}
                    {project.contribution && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border relative overflow-hidden
                            ${
                                theme === 'light'
                                    ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200/80 shadow-lg'
                                    : 'bg-gradient-to-br from-[#0b1021] to-[#111b33] border-blue-800/30 shadow-2xl'
                            }`}
                        >
                            {/* Accent border */}
                            <div
                                className={`absolute top-0 left-0 bottom-0 w-[3px]
                                ${theme === 'light' ? 'bg-gradient-to-b from-blue-400 to-cyan-400' : 'bg-gradient-to-b from-[#3c86ff] to-[#69f1ff]'}`}
                            />

                            <div className="flex items-center gap-3 mb-3 pl-3">
                                <FaUserCheck
                                    className={`text-xl ${theme === 'light' ? 'text-blue-600' : 'text-[#69f1ff]'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    My Contribution
                                </h2>
                            </div>
                            <p
                                className={`text-sm lg:text-base leading-relaxed pl-3
                                ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                            >
                                {project.contribution}
                            </p>
                        </motion.div>
                    )}

                    {/* Tech Stack */}
                    {project.skills && Object.keys(project.skills).length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border
                            ${
                                theme === 'light'
                                    ? 'bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-lg'
                                    : 'bg-[#0b1021]/80 backdrop-blur-sm border-gray-700/50 shadow-2xl'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaCogs
                                    className={`text-xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    Tech Stack
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {Object.entries(project.skills).map(([skill, level], i) => (
                                    <div
                                        key={i}
                                        className={`group relative px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105 cursor-default ${getSkillColor(level as number)}`}
                                    >
                                        <span>{skill}</span>
                                        <span className={`ml-1.5 text-[10px] opacity-60`}>
                                            {getSkillTypeLabel(level as number)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Artifacts */}
                    {(project.artifacts.screenshots?.length || project.artifacts.writeup) && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border
                            ${
                                theme === 'light'
                                    ? 'bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-lg'
                                    : 'bg-[#0b1021]/80 backdrop-blur-sm border-gray-700/50 shadow-2xl'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaImages
                                    className={`text-xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    Artifacts
                                </h2>
                            </div>

                            {project.artifacts.screenshots &&
                                project.artifacts.screenshots.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {project.artifacts.screenshots.map((src, i) => (
                                            <div
                                                key={i}
                                                className={`rounded-xl overflow-hidden border
                                                ${theme === 'light' ? 'border-slate-200' : 'border-gray-700'}`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${project.name} screenshot ${i + 1}`}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                            {project.artifacts.writeup && (
                                <div
                                    className={`text-sm leading-relaxed whitespace-pre-line
                                    ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                >
                                    {project.artifacts.writeup}
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default ProjectDetail;
